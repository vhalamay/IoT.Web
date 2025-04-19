using System;

namespace IoT.Web.Data.Entities.Abstract
{
    public abstract class AbstractAuditEntity : AbstractEntity
    {
        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }
    }
}
