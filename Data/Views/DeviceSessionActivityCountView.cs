using System;

namespace IoT.Web.Data.Views
{
    public class DeviceSessionActivityCountView
    {
        public long DeviceId { get; set; }
        public DateTime Date { get; set; }
        public int Sessions {  get; set; }
        public int Activities {  get; set; }
    }
}
