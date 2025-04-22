using IoT.Web.Models.Enums;

namespace IoT.Web.Models.Responses.Sessions
{
    public class SessionDashboardItemResponse
    {
        public ActivityType Activity { get; set; }

        public int Duration { get; set; }

        public SessionDashboardItemResponse(ActivityType activity, int duration)
        {
            Activity = activity;
            Duration = duration;
        }
    }
}
