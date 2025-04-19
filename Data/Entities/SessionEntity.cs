using IoT.Web.Data.Entities.Abstract;

namespace IoT.Web.Data.Entities
{
    public class SessionEntity : AbstractAuditEntity
    {
        public long DeviceId { get; set; }
        public virtual DeviceEntity Device { get; set; }
    }
}
