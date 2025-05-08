using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Images;
using IoT.Web.Models.Responses.Sessions;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace IoT.Web.Controllers
{
    public class ApiSessionController : AbstractController<ApiSessionController>
    {
        ISessionService _sessionService;
        public ApiSessionController(ILogger<ApiSessionController> logger, ISessionService sessionService) 
            : base(logger)
        {
            _sessionService = sessionService;
        }

        [HttpGet("api/sessions")]
        public async Task<SessionsResponse> GetSessions(SessionsRequest request) =>
            await _sessionService.GetSessions(request);

        [HttpGet("api/sessions/{id}/dashboard")]
        public async Task<SessionDashboardResponse> GetSessionDashboard(long id) =>
            await _sessionService.GetSessionDashboard(id);

        [HttpGet("api/sessions/{id}/images")]
        public async Task<ImagesResponse> GetSessionImages(long id, ImagesRequest request) =>
            await _sessionService.GetSessionImages(id, request);
    }
}
