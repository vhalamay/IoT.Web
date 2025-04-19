using System;

namespace IoT.Web.Data.Entities.Abstract
{
    public abstract class AbstractAuditEntity : AbstractEntity
    {
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Updatedby { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
