using IoT.Web.Data.Entities;

namespace IoT.Web.Models.Responses.Devices
{
    public class DeviceResponse
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Created { get; set; }

        public DeviceResponse()
        {

        }
    }
}
