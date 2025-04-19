using IoT.Web.Models.Requests.Identity;
using System.Threading.Tasks;

namespace IoT.Web.Services.Interfaces
{
    public interface IIdentityService
    {
        Task Login(LoginRequest request);
    }
}
