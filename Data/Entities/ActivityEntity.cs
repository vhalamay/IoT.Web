using IoT.Web.Data.Entities.Abstract;
using IoT.Web.Models.Enums;

namespace IoT.Web.Data.Entities
{
    public class ActivityEntity : AbstractAuditEntity
    {
        public long SessionId { get; set; }
        public ActivityType Type { get; set; }
        public virtual SessionEntity Session { get; set; }
    }
}
