using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Images;
using IoT.Web.Models.Responses.Sessions;
using IoT.Web.Services.Interfaces;
using System.Threading.Tasks;

namespace IoT.Web.Services
{
    public class SessionService : ISessionService
    {
        ISessionRepository _sessionRepository;
        public SessionService(ISessionRepository sessionRepository)
        {
            _sessionRepository = sessionRepository;
        }
        public Task<SessionsResponse> GetSessions(SessionsRequest request, long? deviceId = null)
        {
            return _sessionRepository.GetSessions(request, deviceId);
        }
        public Task<SessionDashboardResponse> GetSessionDashboard(long id)
        {
            return _sessionRepository.GetSessionDashboard(id);
        }

        public Task<ImagesResponse> GetSessionImages(long id, ImagesRequest request)
        {
            return _sessionRepository.GetSessionImages(id, request);
        }
    }
}
