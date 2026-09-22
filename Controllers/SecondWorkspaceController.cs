using Microsoft.AspNetCore.Mvc;

namespace DockWorkspace.Controllers
{
    public class SecondWorkspaceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
