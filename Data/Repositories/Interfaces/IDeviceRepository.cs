using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories.Interfaces
{
    public interface IDeviceRepository
    {
        Task<DevicesResponse> GetDevices(DevicesRequest request);
    }
}
