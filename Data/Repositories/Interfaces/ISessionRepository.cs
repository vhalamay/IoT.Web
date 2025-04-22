using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Sessions;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories.Interfaces
{
    public interface ISessionRepository
    {
        Task<SessionsResponse> GetSessions(SessionsRequest request, long? deviceId = null);

        Task<SessionDashboardResponse> GetSessionDashboard(long id);
    }
}
