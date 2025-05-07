using IoT.Web.Data.Entities;
using IoT.Web.Models.Requests.Devices;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IoT.Web.Data.Repositories.Interfaces
{
    public interface IImageRepository
    {
        Task<ActivityEntity> GetImageActivity(ImageRequest request);
        Task<long> CreateImage(Guid imageGuid, List<string> objects, ActivityEntity activity);
    }
}
