using IoT.Web.Data.Views;
using IoT.Web.Extensions;
using System;

namespace IoT.Web.Models.Responses.Sessions
{
    public class SessionResponse
    {
        public long Id { get; set; }
        public string Device { get; set; }
        public string Start { get; set; }
        public string Duration { get; set; }
        public int Activities { get; set; }
        public SessionResponse()
        {

        }
        public SessionResponse(SessionView sessionView)
        {
            Id = sessionView.Id;
            Device = sessionView.Device;
            Start = sessionView.CreatedOn.ToLocalTime().ToString();
            Activities = sessionView.Activities;

            if (sessionView.UpdatedOn.HasValue)
            {
                var seconds = (sessionView.UpdatedOn.Value - sessionView.CreatedOn).TotalSeconds;
                Duration = DateTime.MinValue.AddSeconds(seconds).ToDurationString();
            }
            else
            {
                Duration = "n/a";
            }
        }

    }
}
