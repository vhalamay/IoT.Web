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

        // folders
        [HttpGet("folders")]
        [HttpGet("folders/create")]
        [HttpGet("folders/{folderId}/terms/{termId}/edit")]
        [HttpGet("folders/{folderId}/terms/{termId}/sets")]
        [HttpGet("folders/{folderId}/tests/{testId}/edit")]
        [HttpGet("folders/{id}/clone")]
        [HttpGet("folders/{id}/edit")]
        [HttpGet("folders/{id}/learn")]
        [HttpGet("folders/{id}/sets")]
        [HttpGet("folders/{id}/sets/create")]
        [HttpGet("folders/{id}/terms")]
        [HttpGet("folders/{id}/tests")]
        [HttpGet("folders/{id}/users")]
        // sessions
        [HttpGet("sessions")]
        [HttpGet("sessions/{id}/answer")]
        [HttpGet("sessions/{id}/question")]
        [HttpGet("sessions/{id}/result")]
        // sets
        [HttpGet("sets")]
        [HttpGet("sets/create")]
        [HttpGet("sets/{id}/clone")]
        [HttpGet("sets/{id}/edit")]
        [HttpGet("sets/{id}/folders")]
        [HttpGet("sets/{id}/learn")]
        [HttpGet("sets/{id}/terms")]
        [HttpGet("sets/{id}/tests")]
        [HttpGet("sets/{setId}/terms/create")]
        [HttpGet("sets/{setId}/terms/{termId}/clone")]
        [HttpGet("sets/{setId}/terms/{termId}/edit")]
        [HttpGet("sets/{setId}/terms/{termId}/sets")]
        [HttpGet("sets/{setId}/tests/create")]
        [HttpGet("sets/{setId}/tests/{testId}/clone")]
        [HttpGet("sets/{setId}/tests/{testId}/edit")]
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
