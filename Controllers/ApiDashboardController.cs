using IoT.Web.Models.Responses.Dashboard;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace IoT.Web.Controllers
{
    public class ApiDashboardController : AbstractController<ApiDeviceController>
    {
        private readonly IDashboardService _dashboardService;
        public ApiDashboardController(ILogger<ApiDeviceController> logger, 
            IDashboardService dashboardService) 
            : base(logger)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("api/dashboard/session-activity")]
        public async Task<SessionActivityResponse> GetSessionActivity() =>
            await _dashboardService.GetSessionActivityResponse();

        [HttpGet("api/dashboard/session-activity/{deviceId}")]
        public async Task<SessionActivityResponse> GetSessionActivity(long deviceId) =>
            await _dashboardService.GetSessionActivityResponse(deviceId);
    }
}
