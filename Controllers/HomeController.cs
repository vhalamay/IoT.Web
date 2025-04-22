using IoT.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace IoT.Web.Controllers
{
    public class HomeController : AbstractController<HomeController>
    {
        public HomeController(ILogger<HomeController> logger) : base(logger)
        {
        }

        // devices
        [HttpGet("devices")]
        [HttpGet("devices/{id}/sessions")]
        // sessions
        [HttpGet("sessions")]
        [HttpGet("sessions/{id}/dashboard")]
        public IActionResult Home()
        {
            return View("Index");
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
