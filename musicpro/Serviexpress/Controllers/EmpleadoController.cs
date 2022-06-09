using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serviexpress.Repositories;
using Serviexpress.Entities;
using Microsoft.AspNetCore.Identity;

namespace Serviexpress.Controllers
{
    [Produces("application/json")]
    public class EmpleadoController : Controller
    {

        IEmpleadoRepositorie empleadoRepositorie;
        public EmpleadoController(IEmpleadoRepositorie _empleadoRepositorie) {
            empleadoRepositorie = _empleadoRepositorie;
        }
        // GET: Empleado
        public ActionResult Index()
        {
            return View();
        }
        [Route("api/GetEmpleados")]
        public ActionResult GetEmpleados()
        {
            var result = empleadoRepositorie.GetEmpleadoList();           
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
        [Route("api/GetEmpleadoPorID/{emp_id}")]
        public ActionResult GetEmpleadoPorID(int emp_id)
        {
            var result = empleadoRepositorie.GetEmpleadoPorID(emp_id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetReservaPorID/{res_id}")]
        public ActionResult GetReservaPorID(int res_id)
        {
            var result = empleadoRepositorie.GetReservaPorID(res_id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetOrdenPorID/{orden_id}")]
        public ActionResult GetOrdenPorID(int orden_id)
        {
            var result = empleadoRepositorie.GetOrdenPorID(orden_id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetTiposervicios")]
        public ActionResult GetTiposervicios()
        {
            var result = empleadoRepositorie.GetTipoServiciosList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetMecanicos")]
        public ActionResult GetMecanicos()
        {
            var result = empleadoRepositorie.GetMecanicos();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetClientes")]
        public ActionResult GetClientes()
        {
            var result = empleadoRepositorie.GetClientesList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetProveedores")]
        public ActionResult GetProveedores()
        {
            var result = empleadoRepositorie.GetProveedoresList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [Route("api/GetTOrden")]
        public ActionResult GetTOrden()
        {
            var result = empleadoRepositorie.GetTOrdenList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        /* [HttpGet(Name = "ObtenerEmpleados")]
         [Route("ObtenerEmpleados")]
         public IActionResult ObtenerEmpleados()
         {
             var result = new MAMantenedor().ObtenerMantenedor();
             if (!result.ok)
             {
                 result.mensaje = "No se pudo obtener la oportunidad.";
             }

             return Ok(result);
         }*/

        // GET: Empleado/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Empleado/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Empleado/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Empleado/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Empleado/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Empleado/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Empleado/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}