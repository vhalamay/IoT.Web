using IoT.Web.Exceptions;
using System;

namespace IoT.Web.Extensions
{
    public static class DateExtensions
    {
        public static DateTime GetLocalTime(this DateTime utcDateTime)
        {
            var fleTimeZone = GetTimeZoneInfo();

            return TimeZoneInfo.ConvertTime(utcDateTime, fleTimeZone);
        }

        public static DateTime GetLocalDateInUtc()
        {
            var fleTimeZone = GetTimeZoneInfo();

            var now = DateTime.UtcNow.Date;
            TimeSpan utcOffset = fleTimeZone.GetUtcOffset(now);
            var localTime = new DateTime(now.Ticks - utcOffset.Ticks, DateTimeKind.Local);

            return localTime;
        }

        private static TimeZoneInfo GetTimeZoneInfo()
        {
            return TimeZoneInfo.FindSystemTimeZoneById("FLE Standard Time")
                ?? throw new BadRequestException("FLE Standard Time not found");
        }
    }
}
