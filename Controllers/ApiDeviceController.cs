using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Models.Responses.Sessions;
using IoT.Web.Services;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace IoT.Web.Controllers
{
    public class ApiDeviceController : AbstractController<ApiDeviceController>
    {
        IDeviceService _deviceService;
        ISessionService _sessionService;
        public ApiDeviceController(ILogger<ApiDeviceController> logger,
            IDeviceService deviceService,
            ISessionService sessionService)
            : base(logger)
        {
            _deviceService = deviceService;
            _sessionService = sessionService;
        }

        [HttpGet("api/devices")]
        public async Task<DevicesResponse> GetDevices(DevicesRequest request) =>
            await _deviceService.GetDevices(request);

        [HttpPost("api/devices/{id}/start")]
        public async Task StartDevice(long id) =>
            await _deviceService.StartDevice(id, CurrentUserId);

        [HttpPost("api/devices/{id}/finish")]
        public async Task FinishDevice(long id) =>
            await _deviceService.FinishDevice(id, CurrentUserId);

        [HttpGet("api/devices/{id}/sessions")]
        public async Task<SessionsResponse> GetSessions([FromRoute] long id, [FromQuery] SessionsRequest request) =>
            await _sessionService.GetSessions(request, id);
    }
}
