using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Sessions;
using System.Threading.Tasks;

namespace IoT.Web.Services.Interfaces
{
    public interface ISessionService
    {
        Task<SessionsResponse> GetSessions(SessionsRequest request, long? deviceId = null);
        Task<SessionDashboardResponse> GetSessionDashboard(long id);
    }
}
