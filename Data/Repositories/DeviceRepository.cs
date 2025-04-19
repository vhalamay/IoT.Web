using Azure;
using IoT.Web.Data.Entities;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Extensions;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories
{
    public class DeviceRepository : AbstractRepository, IDeviceRepository
    {
        public DeviceRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<DevicesResponse> GetDevices(DevicesRequest request)
        {
            var count = await Context.Devices.CountAsync();
            var response = new DevicesResponse
            {
                Count = count
            };

            var query = Context.Devices.AsQueryable();

            if(!string.IsNullOrWhiteSpace(request.Name))
                query = query.Where(q => q.Name.Contains(request.Name));

            response.Items = await query
                .Select(d => new DeviceResponse 
                { 
                    Id = d.Id,
                    Name = d.Name,
                    Active = d.Active
                })
                .OrderBy(o => o.Name)
                .Skip(request.GetSkip(response.Count))
                .Take(PagingExtensions.Take)
                .ToListAsync();

            return response;
        }

        public async Task StartDevice(long deviceId, string userGuid)
        {
            // device
            var device = await Context.Devices
                .Where(d => d.Id == deviceId)
                .FirstOrDefaultAsync();

            device.Active = true;
            SetUpdated(device, userGuid);
            Context.Devices.Update(device);

            // session
            var session = new SessionEntity
            {
                DeviceId = deviceId,
            };
            SetCreated(session, userGuid);
            await Context.Sessions.AddAsync(session);

            // activity
            var activity = new ActivityEntity
            {
                Session = session,
                Type = Models.Enums.ActivityType.Started
            };
            SetCreated(activity, userGuid);
            await Context.Activities.AddAsync(activity);

            await Context.SaveChangesAsync();
        }
        public async Task FinishDevice(long deviceId, string userGuid)
        {
            // device
            var device = await Context.Devices
                .Where(d => d.Id == deviceId)
                .FirstOrDefaultAsync();

            device.Active = false;
            SetUpdated(device, userGuid);
            Context.Devices.Update(device);

            // session
            var session = await Context.Sessions
                .Where(s => s.DeviceId == deviceId)
                .OrderByDescending(s => s.CreatedOn)
                .FirstOrDefaultAsync();

            if(session != null)
            {
                SetUpdated(session, userGuid);
                Context.Sessions.Update(session);
            }
            else
            {
                session = new SessionEntity
                {
                    DeviceId = deviceId,
                };
                SetCreated(session, userGuid);
                SetUpdated(session, userGuid);
                await Context.Sessions.AddAsync(session);
            }

            // activity
            var activity = new ActivityEntity
            {
                Session = session,
                Type = Models.Enums.ActivityType.Finished
            };
            SetCreated(activity, userGuid);
            await Context.Activities.AddAsync(activity);

            await Context.SaveChangesAsync();
        }
    }
}
