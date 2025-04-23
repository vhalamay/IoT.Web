using IoT.Web.Extensions;
using IoT.Web.Models.Enums;

namespace IoT.Web.Models.Responses.Dashboard
{
    public class ActivityTypeResponse
    {
        public ActivityType Type { get; set; }
        public int Count { get; set; }
        public string Name => Type.GetName();
    }
}
