using IoT.Web.Services.Interfaces;
using System.Net.Http;
using System;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using IoT.Web.Models.Responses.Images;
using System.Linq;
using IoT.Web.Constants;

namespace IoT.Web.Services
{
    public class ImageRecognitionService : IImageRecognitionService
    {
        public async Task<List<string>> Recognize(Guid imageGuid)
        {
            var imagePath = string.Format(ImageConstants.ImagePath, imageGuid);

            var apiKey = "adb9a437b579460db7e29f0c324551ba";

            var base64Image = Convert.ToBase64String(await System.IO.File.ReadAllBytesAsync(imagePath));

            var json = $@"
                {{
                    ""inputs"": [
                        {{
                            ""data"": {{
                                ""image"": {{
                                    ""base64"": ""{base64Image}""
                                }}
                            }}
                        }}
                    ]
                }}";

            var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Key", apiKey);
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("https://api.clarifai.com/v2/models/general-image-recognition/outputs", content);
            var responseBody = await response.Content.ReadAsStringAsync();
            var clarifaiResponse = JsonSerializer.Deserialize<ClarifaiResponse>(responseBody);

            return clarifaiResponse.Outputs[0].Data.Concepts
                .Select(s => s.Name).Take(5).ToList();
        }
    }
}
