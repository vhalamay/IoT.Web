namespace IoT.Web.Models.Requests.Sessions
{
    public class ImagesRequest : IPagingRequest
    {
        public int? Page { get; set; }
        public string Order { get; set; }
    }
}
