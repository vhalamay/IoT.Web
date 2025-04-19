namespace IoT.Web.Models.Requests.Devices
{
    public class DevicesRequest : IPagingRequest
    {
        public int? Page {  get; set; }
        public string Order { get; set; }
        public string Name { get; set; }
    }
}
