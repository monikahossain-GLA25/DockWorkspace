using Microsoft.AspNetCore.Mvc;

namespace DockWorkspace.Controllers
{
    public class WorkspaceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
