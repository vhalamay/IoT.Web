using IoT.Web.Models.Responses.Dashboard;
using System.Threading.Tasks;

namespace IoT.Web.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<SessionActivityResponse> GetSessionActivityResponse();
        Task<SessionActivityResponse> GetSessionActivityResponse(long deviceId);
    }
}
