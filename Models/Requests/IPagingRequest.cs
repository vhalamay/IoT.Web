namespace IoT.Web.Models.Requests
{
    public interface IPagingRequest
    {
        public int? Page { get; set; }

        public string Order { get; set; }
    }
}
