using IoT.Web.Models.Enums;
using System;

namespace IoT.Web.Data.Views
{
    public class ImageView
    {
        public long ImageId { get; set; }
        public Guid ImageGuid { get; set; }
        public long SessionId { get; set; }
        public long ActivityId { get; set; }
        public ActivityType ActivityType { get; set; }
        public string ObjectsJson { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
