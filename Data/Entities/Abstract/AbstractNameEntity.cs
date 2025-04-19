using System.ComponentModel.DataAnnotations;

namespace IoT.Web.Data.Entities.Abstract
{
    public abstract class AbstractNameEntity : AbstractAuditEntity
    {
        [MaxLength(256)]
        public string Name { get; set; }

        [MaxLength(1024)]
        public string Description { get; set; }
    }
}
