using IoT.Web.Models.Enums;

namespace IoT.Web.Models.Requests.Devices
{
    public class ActivityRequest
    {
        public string DeviceSecret { get; set; }

        public ActivityType Type { get; set; }
    }
}
