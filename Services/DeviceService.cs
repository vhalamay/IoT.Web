using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Services.Interfaces;
using System.Threading.Tasks;

namespace IoT.Web.Services
{
    public class DeviceService : IDeviceService
    {
        IDeviceRepository _deviceRepository;
        public DeviceService(IDeviceRepository deviceRepository)
        {
            _deviceRepository = deviceRepository;
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
    }
}
