using IoT.Web.Data.Entities.Abstract;
using System.Collections.Generic;

namespace IoT.Web.Data.Entities
{
    public class SessionEntity : AbstractAuditEntity
    {
        public long DeviceId { get; set; }
        public virtual DeviceEntity Device { get; set; }

        public virtual ICollection<ActivityEntity> Activities { get; set; }
    }
}
