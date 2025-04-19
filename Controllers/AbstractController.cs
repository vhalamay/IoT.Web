using System;
using System.Security.Claims;
using IoT.Web.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IoT.Web.Controllers
{
    [Authorize]
    public abstract class AbstractController<T> : Controller
    {
        protected readonly ILogger<T> Logger;

        protected AbstractController(ILogger<T> logger)
        {
            Logger = logger;
        }

        public string CurrentUserId
        {
            get
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                    throw new UnauthorizedException();

                return userId;
            }
        }
    }
}
