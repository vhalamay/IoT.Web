using IoT.Web.Data.Entities.Abstract;
using System;

namespace IoT.Web.Data.Entities
{
    public class ImageEntity : AbstractAuditEntity
    {
        public Guid ImageGuid { get; set; }
        public string ObjectsJson { get; set; }
        public long ActivityId { get; set; }
        public virtual ActivityEntity Activity { get; set; }
    }
}
