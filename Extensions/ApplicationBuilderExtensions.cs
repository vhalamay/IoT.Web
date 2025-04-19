using IoT.Web.Data;
using IoT.Web.Data.Scripts;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace IoT.Web.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static void Seed(this IApplicationBuilder applicationBuilder)
        {
            var scriptType = typeof(IScript);
            var types = AppDomain.CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => scriptType.IsAssignableFrom(p) && !p.IsInterface)
                .ToList();

            var scripts = new Dictionary<string, string>();
            foreach(var type in types)
            {
                var name = type.Name;
                var instance = (IScript)Activator.CreateInstance(type);
                var script = instance.GetScript();
                scripts.Add(name, script);
            }

            using var serviceScope = applicationBuilder.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>()
                .CreateScope();

            using var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

            context.Database.Migrate();

            using var transaction = context.Database.BeginTransaction();

            try
            {
                foreach (var script in scripts)
                {
                    context.Database.ExecuteSqlRaw(script.Value);
                    Console.WriteLine($"Seed {script.Key}");
                }
                transaction.Commit();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                transaction.Rollback();
            }
        }
    }
}
