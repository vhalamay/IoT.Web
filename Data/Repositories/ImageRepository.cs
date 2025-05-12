using Azure.Core;
using IoT.Web.Data.Entities;
using IoT.Web.Data.Repositories.Interfaces;
using IoT.Web.Exceptions;
using IoT.Web.Models.Requests.Devices;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories
{
    public class ImageRepository : AbstractRepository, IImageRepository
    {
        public ImageRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<long> CreateImage(Guid imageGuid, List<string> objects, ActivityEntity activity)
        {
            var userGuid = activity.Updatedby ?? activity.CreatedBy;

            var objectsJson = JsonSerializer.Serialize(objects);

            var entity = new ImageEntity
            {
                ImageGuid = imageGuid,
                ActivityId = activity.Id,
                ObjectsJson = objectsJson
            };

            SetCreated(entity, userGuid);

            await Context.Images.AddAsync(entity);
            await Context.SaveChangesAsync();

            return entity.Id;
        }

        public async Task<ActivityEntity> GetImageActivity(ImageRequest request)
        {
            var device = await Context.Devices
                .Where(d => d.Secret == request.DeviceSecret)
                .FirstOrDefaultAsync();

            var session = await Context.Sessions
                .Where(s => !s.UpdatedOn.HasValue && s.DeviceId == device.Id)
                .OrderByDescending(s => s.CreatedOn)
                .FirstOrDefaultAsync()
                ?? throw new BadRequestException("Image cannot be created. No active session");

            var activity = await Context.Activities
                .Where(w => w.SessionId == session.Id
                    && w.Type != Models.Enums.ActivityType.Started
                    && w.Type != Models.Enums.ActivityType.Finished)
                .OrderByDescending(w => w.CreatedOn)
                .FirstOrDefaultAsync()
                ?? throw new BadRequestException("Image cannot be created. No valid activity");

            return activity;
        }

        public async Task<Guid?> GetLastImageGuid(long activityId)
        {
            var image = await Context.Images
                .Where(w => w.ActivityId == activityId)
                .OrderByDescending(o => o.CreatedOn)
                .FirstOrDefaultAsync();

            if (image == null)
                return null;

            return image.ImageGuid;
        }
    }
}
