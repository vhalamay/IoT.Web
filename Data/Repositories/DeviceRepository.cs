using IoT.Web.Data.Entities;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Exceptions;
using IoT.Web.Extensions;
using IoT.Web.Models.Enums;
using IoT.Web.Models.Requests.Devices;
using IoT.Web.Models.Responses.Devices;
using Microsoft.EntityFrameworkCore;
using System.Data;
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
            var query = Context.ViewDevices.AsQueryable();

            var count = await query.CountAsync();
            var response = new DevicesResponse
            {
                Count = count
            };

            if (!string.IsNullOrWhiteSpace(request.Name))
                query = query.Where(q => q.Name.Contains(request.Name));

            response.Items = await query
                .Select(d => new DeviceResponse
                {
                    Id = d.Id,
                    Name = d.Name,
                    Active = d.Active,
                    Sessions = d.Sessions,
                })
                .OrderBy(o => o.Name)
                .Skip(request.GetSkip(response.Count))
                .Take(PagingExtensions.Take)
                .ToListAsync();

            return response;
        }

        public async Task<SessionEntity> StartDevice(long deviceId, string userGuid)
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

            await Context.SaveChangesAsync();

            return session;
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

            if (session != null)
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

            await Context.SaveChangesAsync();
        }

        public async Task<ActivityEntity> CreateActivity(ActivityRequest request)
        {
            using var transaction = await Context.Database
                .BeginTransactionAsync(IsolationLevel.Serializable);

            var device = await Context.Devices
                .Where(d => d.Secret == request.DeviceSecret)
                .FirstOrDefaultAsync();

            var userGuid = device.Updatedby ?? device.CreatedBy;

            var session = await Context.Sessions
                .Where(s => !s.UpdatedOn.HasValue && s.DeviceId == device.Id)
                .OrderByDescending(s => s.CreatedOn)
                .FirstOrDefaultAsync();


            // Started
            if (request.Type == ActivityType.Started)
                session ??= await StartDevice(device.Id, userGuid);

            // Finished
            if (request.Type == ActivityType.Finished)
                await FinishDevice(device.Id, userGuid);

            var activity = new ActivityEntity
            {
                SessionId = session.Id,
                Type = request.Type,
            };

            SetCreated(activity, session.CreatedBy);

            await Context.Activities.AddAsync(activity);
            await Context.SaveChangesAsync();
            await transaction.CommitAsync();

            return activity;
        }

        public async Task<bool> GetStatus(string secret)
        {
            var device = await Context.Devices
                .Where(d => d.Secret == secret)
                .FirstOrDefaultAsync()
                ?? throw new NotFoundException("Device not found");

            return device.Active;
        }
    }
}
