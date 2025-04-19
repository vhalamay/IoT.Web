using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using System.Threading.Tasks;

namespace IoT.Web.Services.Interfaces
{
    public interface IDeviceService
    {
        Task<DevicesResponse> GetDevices(DevicesRequest request);
    }
}
