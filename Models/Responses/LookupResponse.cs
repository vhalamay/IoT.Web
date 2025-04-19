using System;
using System.Collections.Generic;
using System.Linq;

namespace IoT.Web.Models.Responses
{
    public class LookupResponse : ItemsResponse<LookupItemResponse>
    {
        public LookupResponse(Dictionary<Guid, string> items)
        {
            Items = items.Select(s => new LookupItemResponse(s)).ToList();
            Count = items.Count;
        }
    }

    public class LookupItemResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool? Selected { get; set; }

        public LookupItemResponse(KeyValuePair<Guid, string> keyValue)
        {
            Id = keyValue.Key;
            Name = keyValue.Value;
        }
    }
}
