using IoT.Web.Constants;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Enums;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace IoT.Web.Services
{
    public class DeviceService : IDeviceService
    {
        IDeviceRepository _deviceRepository;
        IImageRepository _imageRepository;
        IImageRecognitionService _imageRecognitionService;
        public DeviceService(IDeviceRepository deviceRepository, 
            IImageRepository imageRepository,
            IImageRecognitionService imageRecognitionService)
        {
            _deviceRepository = deviceRepository;
            _imageRepository = imageRepository;
            _imageRecognitionService = imageRecognitionService;
        }
        public async Task<DevicesResponse> GetDevices(DevicesRequest request)
        {
            return await _deviceRepository.GetDevices(request);
        }
        public async Task StartDevice(long deviceId, string userGuid)
        {
            await _deviceRepository.StartDevice(deviceId, userGuid);
        }
        public async Task FinishDevice(long deviceId, string userGuid)
        {
            await _deviceRepository.FinishDevice(deviceId, userGuid);
        }

        public async Task CreateActivity(ActivityRequest request)
        {
            await _deviceRepository.CreateActivity(request);
        }

        public async Task<long> CreateImage(ImageRequest request)
        {
            var imageGuid = SaveImage(request.Base64);

            var objects = new List<string>();
            var activity = await _imageRepository.GetImageActivity(request);

            if(activity.Type == ActivityType.MotionDetected)
            {
                objects = await _imageRecognitionService.Recognize(imageGuid);
            }

            return await _imageRepository.CreateImage(imageGuid, objects, activity);
        }

        private Guid SaveImage(string base64)
        {
            var imageGuid = Guid.NewGuid();

            try
            {
                byte[] imageBytes = Convert.FromBase64String(base64);

                string filePath = string.Format(ImageConstants.ImagePath, imageGuid);
                File.WriteAllBytes(filePath, imageBytes);
            }
            catch (Exception ex)
            {
                return Guid.Empty;
            }

            return imageGuid;
        }

        public Task<bool> GetStatus(string secret) => 
            _deviceRepository.GetStatus(secret);
    }
}
