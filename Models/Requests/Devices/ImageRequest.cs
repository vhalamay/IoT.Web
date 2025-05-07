using IoT.Web.Models.Enums;

namespace IoT.Web.Models.Requests.Devices
{
    public class ImageRequest
    {
        public string DeviceSecret { get; set; }

        public string Base64 { get; set; }
    }
}
