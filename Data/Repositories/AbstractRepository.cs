using System;
using System.Threading.Tasks;
using IoT.Web.Data.Entities.Abstract;

namespace IoT.Web.Data.Repositories
{
    public interface IRepository
    {
        Task SaveChangesAsync();
    }

    public abstract class AbstractRepository : IRepository
    {
        protected ApplicationDbContext Context;

        protected AbstractRepository(ApplicationDbContext context)
        {
            Context = context;
        }

        public void SetCreated(AbstractAuditEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.Created = DateTime.UtcNow;
        }
        public void SetUpdated(AbstractAuditEntity entity)
        {
            entity.Updated = DateTime.UtcNow;
        }

        public async Task SaveChangesAsync()
        {
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
