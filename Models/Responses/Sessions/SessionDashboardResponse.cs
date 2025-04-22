using System.Collections.Generic;

namespace IoT.Web.Models.Responses.Sessions
{
    public class SessionDashboardResponse
    {
        public List<SessionDashboardItemResponse> Items { get; set; }

        public SessionDashboardResponse()
        {
            Items = new List<SessionDashboardItemResponse>();
        }
    }
}
