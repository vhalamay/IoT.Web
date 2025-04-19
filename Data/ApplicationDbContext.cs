using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IoT.Web.Data.Entities;

namespace IoT.Web.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<ActivityEntity> Activities { get; set; }
        public DbSet<DeviceEntity> Devices { get; set; }
        public DbSet<SessionEntity> Sessions { get; set; }
    }
}
