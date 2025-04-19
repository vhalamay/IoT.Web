using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace IoT.Web.Controllers
{
    public class ApiDeviceController : AbstractController<ApiDeviceController>
    {
        IDeviceService _deviceService;
        public ApiDeviceController(ILogger<ApiDeviceController> logger, IDeviceService deviceService) 
            : base(logger)
        {
            _deviceService = deviceService;
        }

        [HttpGet("api/devices")]
        public async Task<DevicesResponse> GetDevices(DevicesRequest request) =>
            await _deviceService.GetDevices(request);
    }
}
