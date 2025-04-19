using System.Collections.Generic;

namespace IoT.Web.Models.Responses
{
    public class ItemsResponse<T>
    {
        public List<T> Items { get; set; }

        public int? Count { get; set; }
    }
}
