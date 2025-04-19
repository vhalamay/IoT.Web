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

        public void SetCreated(AbstractAuditEntity entity, string userGuid)
        {
            entity.CreatedOn = DateTime.UtcNow;
            entity.CreatedBy = userGuid;
        }
        public void SetUpdated(AbstractAuditEntity entity, string userGuid)
        {
            entity.UpdatedOn = DateTime.UtcNow;
            entity.Updatedby = userGuid;
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
