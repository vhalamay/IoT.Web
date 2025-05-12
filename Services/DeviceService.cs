using Azure.Core;
using IoT.Web.Constants;
using IoT.Web.Data.Entities;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Enums;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
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
            try
            {
                var imageGuid = SaveImage(request.Base64);

                var objects = new List<string>();
                var activity = await _imageRepository.GetImageActivity(request);

                if (activity.Type == ActivityType.MotionDetected || activity.Type == ActivityType.ObjectDetected)
                    activity = await CreateActivity(request.DeviceSecret, ActivityType.PhoneStationary);

                var lastImageGuid = await _imageRepository.GetLastImageGuid(activity.Id);
                if (lastImageGuid.HasValue)
                {
                    var motionDetected = DetectMotion(lastImageGuid.Value, imageGuid);

                    if (motionDetected)
                    {
                        activity = await CreateActivity(request.DeviceSecret, ActivityType.MotionDetected);

                        objects = await _imageRecognitionService.Recognize(imageGuid);
                        if (objects.Any())
                            activity = await CreateActivity(request.DeviceSecret, ActivityType.ObjectDetected);
                    }
                }

                return await _imageRepository.CreateImage(imageGuid, objects, activity);
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        private Task<ActivityEntity> CreateActivity(string deviceSecret, ActivityType type)
        {

            var activityRequest = new ActivityRequest
            {
                DeviceSecret = deviceSecret,
                Type = type,
            };
            return  _deviceRepository.CreateActivity(activityRequest);
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

        private bool DetectMotion(Guid lastImageGuid, Guid newImageGuid)
        {
            var base1 = GetBase64(lastImageGuid);
            var base2 = GetBase64(newImageGuid);

            if (base1 == base2)
                return false;

            var bit1 = Base64ToBitmap(base1);
            var bit2 = Base64ToBitmap(base2);

            return DetectMotion(bit1, bit2);
        }

        private string GetBase64(Guid imageGuid)
        {
            string filePath = string.Format(ImageConstants.ImagePath, imageGuid);

            byte[] fileBytes = File.ReadAllBytes(filePath);

            return Convert.ToBase64String(fileBytes);
        }

        private Bitmap Base64ToBitmap(string base64String)
        {
            byte[] imageBytes = Convert.FromBase64String(base64String);
            using var ms = new MemoryStream(imageBytes);
            return new Bitmap(ms);
        }

        private bool DetectMotion(Bitmap bmp1, Bitmap bmp2, double threshold = 0.15)
        {

            if (bmp1.Width != bmp2.Width || bmp1.Height != bmp2.Height)
                return true;

            int width = bmp1.Width;
            int height = bmp1.Height;

            int diffPixels = 0;
            int totalPixels = width * height;

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    var g1 = ToGray(bmp1.GetPixel(x, y));
                    var g2 = ToGray(bmp2.GetPixel(x, y));

                    if (Math.Abs(g1 - g2) > 15)
                        diffPixels++;
                }
            }

            double diffRatio = (double)diffPixels / totalPixels;

            if(diffRatio > threshold)
            {
                // motion detected
                return true;
            }

            return false;
        }
        private static int ToGray(Color c)
        {
            return (int)(0.3 * c.R + 0.59 * c.G + 0.11 * c.B);
        }

        public Task<bool> GetStatus(string secret) =>
            _deviceRepository.GetStatus(secret);
    }
}
