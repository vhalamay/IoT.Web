using IoT.Web.Data.Views;
using IoT.Web.Extensions;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace IoT.Web.Models.Responses.Images
{
    public class ImageResponse
    {
        public Guid ImageGuid { get; set; }
        public string ActivityType { get; set; }
        public string Objects { get; set; }
        public string CreatedOn { get; set; }

        public ImageResponse()
        {

        }

        public ImageResponse(ImageView imageView)
        {
            ImageGuid = imageView.ImageGuid;
            ActivityType = imageView.ActivityType.GetName();
            CreatedOn = imageView.CreatedOn.ToLocalTime().ToString();

            var objects = JsonSerializer.Deserialize<List<string>>(imageView.ObjectsJson);
            Objects = string.Join(", ", objects);
            if (string.IsNullOrWhiteSpace(Objects))
                Objects = "n/a";
        }
    }
}
