using Azure;
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
                })
                .OrderBy(o => o.Name)
                .Skip(request.GetSkip(response.Count))
                .Take(PagingExtensions.Take)
                .ToListAsync();

            return response;
        }
    }
}
