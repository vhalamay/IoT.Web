using IoT.Web.Data.Entities;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Extensions;
using IoT.Web.Models.Requests.Sessions;
using IoT.Web.Models.Responses.Devices;
using IoT.Web.Models.Responses.Images;
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

        public async Task<SessionDashboardResponse> GetSessionDashboard(long id)
        {
            var activities = await Context.Activities
                .Where(a => a.SessionId == id)
                .Select(a => new ActivityEntity
                {
                    Type = a.Type,
                    CreatedOn = a.CreatedOn
                })
                .ToListAsync();

            var response = new SessionDashboardResponse();
            for (int i = 0; i < activities.Count; i++)
            {
                if (i == 0)
                {
                    response.Items.Add(new SessionDashboardItemResponse(activities[i].Type, 0));
                }
                else
                {
                    var duration = activities[i].CreatedOn - activities[i - 1].CreatedOn;
                    response.Items.Add(new SessionDashboardItemResponse(activities[i].Type, (int)duration.TotalSeconds));
                }
            }

            return response;
        }

        public async Task<ImagesResponse> GetSessionImages(long id, ImagesRequest request)
        {
            var response = new ImagesResponse();

            var query = Context.ViewImages
                .Where(w => w.SessionId == id);

            response.Count = await query.CountAsync();

            var items = await query
                .OrderByDescending(o => o.CreatedOn)
                .Skip(request.GetSkip(response.Count))
                .Take(PagingExtensions.Take)
                .ToListAsync();

            response.Items = items
                .Select(s => new ImageResponse(s))
                .ToList();

            return response;
        }
    }
}
