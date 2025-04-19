using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IoT.Web.Data.Entities;
using IoT.Web.Data.Views;
using IoT.Web.Data.Scripts;

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

            builder.Entity<SessionView>()
                .HasNoKey()
                .ToView(nameof(ViewSessions));
        }
        public DbSet<ActivityEntity> Activities { get; set; }
        public DbSet<DeviceEntity> Devices { get; set; }
        public DbSet<SessionEntity> Sessions { get; set; }
        public DbSet<SessionView> ViewSessions { get; set; }
    }
}
