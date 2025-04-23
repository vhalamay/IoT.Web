using IoT.Web.Models.Enums;

namespace IoT.Web.Extensions
{
    public static class EnumExtensions
    {
        public static string GetName(this ActivityType activityType)
        {
            return activityType switch
            {
                ActivityType.Started => "Started",
                ActivityType.PhoneInMotion => "Phone in Motion",
                ActivityType.PhoneStationary => "Phone Stationary",
                ActivityType.MotionDetected => "Motion Detected",
                ActivityType.ObjectDetected => "Object Detected",
                ActivityType.Finished => "Finished",
                _ => "Unknown"
            };
        }
    }
}
