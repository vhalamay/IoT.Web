using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IoT.Web.Services.Interfaces
{
    public interface IImageRecognitionService
    {
        Task<List<string>> Recognize(Guid imageGuid);
    }
}
