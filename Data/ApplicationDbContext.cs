using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IoT.Web.Data.Entities;
using IoT.Web.Data.Views;

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

            builder.Entity<DeviceView>()
                .HasNoKey()
                .ToView(nameof(ViewDevices));

            builder.Entity<DeviceSessionActivityCountView>()
                .HasNoKey()
                .ToView(nameof(ViewDeviceSessionActivityCounts));

            builder.Entity<ImageView>()
                .HasNoKey()
                .ToView(nameof(ViewImages));

            builder.Entity<SessionActivityCountView>()
                .HasNoKey()
                .ToView(nameof(ViewSessionActivityCounts));

            builder.Entity<SessionView>()
                .HasNoKey()
                .ToView(nameof(ViewSessions));
        }
        public DbSet<ActivityEntity> Activities { get; set; }
        public DbSet<DeviceEntity> Devices { get; set; }
        public DbSet<ImageEntity> Images { get; set; }
        public DbSet<SessionEntity> Sessions { get; set; }

        public DbSet<DeviceView> ViewDevices { get; set; }
        public DbSet<DeviceSessionActivityCountView> ViewDeviceSessionActivityCounts { get; set; }
        public DbSet<ImageView> ViewImages { get; set; }
        public DbSet<SessionActivityCountView> ViewSessionActivityCounts { get; set; }
        public DbSet<SessionView> ViewSessions { get; set; }
    }
}
