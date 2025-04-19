using IoT.Web.Exceptions;
using System;
using System.Collections.Generic;

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

        public static string ToDurationString(this DateTime dateTime)
        {
            // Base datetime (start of the day)
            var startOfDay = DateTime.MinValue;

            // Calculate the duration
            TimeSpan duration = dateTime - startOfDay;

            var timeComponents = new List<string>();

            // Check each component and add to the list if it's non-zero
            if (duration.Days > 0)
                timeComponents.Add($"{duration.Days} days");
            if (duration.Hours > 0)
                timeComponents.Add($"{duration.Hours} hours");
            if (duration.Minutes > 0)
                timeComponents.Add($"{duration.Minutes} mins");
            if (duration.Seconds > 0)
                timeComponents.Add($"{duration.Seconds} secs");

            // Join the components with commas and output the result
            var result = string.Join(",\n", timeComponents);

            // If all are zero, display that as well
            if (string.IsNullOrEmpty(result))
                result = "n/a";

            return result.Trim();
        }
        public static string ToDurationString(this DateTime? dateTime)
        {
            if (dateTime.HasValue)
                return dateTime.Value.ToDurationString();

            return "n/a";
        }
    }
}
