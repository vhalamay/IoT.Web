using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Extensions;
using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Models.Responses.Sessions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories
{
    public class SessionRepository : AbstractRepository, ISessionRepository
    {
        public SessionRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<SessionsResponse> GetSessions(SessionsRequest request, long? deviceId = null)
        {
            var query = Context.ViewSessions.AsQueryable();
            if (deviceId.HasValue)
                query = query.Where(s => s.DeviceId == deviceId.Value);

            var count = await query.CountAsync();
            var response = new SessionsResponse
            {
                Count = count
            };

            var viewSessions = await query
                .OrderByDescending(o => o.CreatedOn)
                .Skip(request.GetSkip(response.Count))
                .Take(PagingExtensions.Take)
                .ToListAsync();

            response.Items = viewSessions
                .Select(s => new SessionResponse(s))
                .ToList();

            return response;
        }
    }
}
