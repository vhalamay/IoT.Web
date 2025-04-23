using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Responses.Dashboard;
using IoT.Web.Services.Interfaces;
using System.Threading.Tasks;

namespace IoT.Web.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public Task<SessionActivityResponse> GetSessionActivityResponse() => 
            _dashboardRepository.GetSessionActivityResponse();

        public Task<SessionActivityResponse> GetSessionActivityResponse(long deviceId) => 
            _dashboardRepository.GetSessionActivityResponse(deviceId);
    }
}
