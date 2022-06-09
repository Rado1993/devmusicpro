using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serviexpress.Repositories;

namespace Serviexpress.Controllers
{
    public class ServicioController : Controller
    {
        IEmpleadoRepositorie empleadoRepositorie;
        public ServicioController(IEmpleadoRepositorie _empleadoRepositorie)
        {
            empleadoRepositorie = _empleadoRepositorie;
        }
        public IActionResult Index()
        {
            return View();
        }

        [Route("api/GetServicios")]
        public ActionResult GetServicios()
        {
            var result = empleadoRepositorie.GetServicios();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}