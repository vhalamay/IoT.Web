using IoT.Web.Exceptions;
using IoT.Web.Models.Requests.Identity;
using IoT.Web.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace IoT.Web.Services
{

    public class IdentityService : IIdentityService
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        public IdentityService(SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
        }

        public async Task Login(LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, request.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
                return;

            if (result.RequiresTwoFactor)
            {
                throw new ForbiddenException();
                //return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = request.RememberMe });
            }
            if (result.IsLockedOut)
            {
                throw new ForbiddenException();
                //return RedirectToPage("./Lockout");
            }
            else
            {
                throw new ForbiddenException();
                //ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                //return Page();
            }
        }
    }
}
