using IoT.Web.Models.Responses.Dashboard;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories.Interfaces
{
    public interface IDashboardRepository
    {
        Task<SessionActivityResponse> GetSessionActivityResponse();
        Task<SessionActivityResponse> GetSessionActivityResponse(long deviceId);

        Task<ActivityTypesResponse> GetActivityTypes();
        Task<ActivityTypesResponse> GetActivityTypesForDevice(long deviceId);
        Task<ActivityTypesResponse> GetActivityTypesForSession(long sessionId);
    }
}
