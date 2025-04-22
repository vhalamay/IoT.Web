using IoT.Web.Data.Entities;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories.Interfaces
{
    public interface IDeviceRepository
    {
        Task<DevicesResponse> GetDevices(DevicesRequest request);
        Task<SessionEntity> StartDevice(long deviceId, string userGuid);
        Task FinishDevice(long deviceId, string userGuid);
        Task CreateActivity(ActivityRequest request);
    }
}
