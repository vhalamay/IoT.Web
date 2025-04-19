using IoT.Web.Models.Requests.Identity;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace IoT.Web.Controllers
{
    public class ApiIdentityController : AbstractController<ApiIdentityController>
    {
        private readonly IIdentityService _identityService;
        public ApiIdentityController(ILogger<ApiIdentityController> logger,
            IIdentityService identityService) : base(logger)
        {
            _identityService = identityService;
        }

        [HttpPost("api/identity/login"), AllowAnonymous]
        public async Task Login([FromBody] LoginRequest request) =>
            await _identityService.Login(request);
    }
}
