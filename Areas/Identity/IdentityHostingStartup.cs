using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(IoT.Web.Areas.Identity.IdentityHostingStartup))]
namespace IoT.Web.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}
