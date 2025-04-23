using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Models.Responses.Dashboard;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories
{
    public class DashboardRepository : AbstractRepository, IDashboardRepository
    {
        private readonly int _sessionActivityCount = 8;
        public DashboardRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<SessionActivityResponse> GetSessionActivityResponse()
        {
            var viewResult = await Context.ViewSessionActivityCounts
                .OrderByDescending(o => o.Date)
                .Take(_sessionActivityCount)
                .ToListAsync();

            var items = viewResult
                .Select(s => new SessionActivityCountResponse
                {
                    Date = s.Date.ToShortDateString(),
                    Sessions = s.Sessions,
                    Activities = s.Activities
                })
                .ToList();

            return new SessionActivityResponse
            {
                Items = items
            };
        }

        public async Task<SessionActivityResponse> GetSessionActivityResponse(long deviceId)
        {
            var viewResult = await Context.ViewDeviceSessionActivityCounts
                .Where(o => o.DeviceId == deviceId)
                .OrderByDescending(o => o.Date)
                .Take(_sessionActivityCount)
                .ToListAsync();

            var items = viewResult
                .Select(s => new SessionActivityCountResponse
                {
                    Date = s.Date.ToShortDateString(),
                    Sessions = s.Sessions,
                    Activities = s.Activities
                })
                .ToList();

            return new SessionActivityResponse
            {
                Items = items
            };
        }
    }
}
