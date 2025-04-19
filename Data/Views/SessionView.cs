using System;

namespace IoT.Web.Data.Views
{
    public class SessionView
    {
        public long Id { get; set; }
        public long DeviceId { get; set; }
        public string Device { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public int Activities { get; set; }
    }
}
