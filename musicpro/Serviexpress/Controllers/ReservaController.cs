using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serviexpress.Repositories;
using Serviexpress.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace Serviexpress.Controllers
{
    public class ReservaController : Controller
    {
        IEmpleadoRepositorie empleadoRepositorie;
        public ReservaController(IEmpleadoRepositorie _empleadoRepositorie)
        {
            empleadoRepositorie = _empleadoRepositorie;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/GetTReservas")]
        public ActionResult GetTReservas()
        {
            var result = empleadoRepositorie.GetTReservasList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("api/GetTDocumentos")]
        public ActionResult GetTDocumentos()
        {
            var result = empleadoRepositorie.GetTDocumentosList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("api/IngresarReserva/{id_usuario}/{patente}/{fecha}/{hora}/{servicio}/{mecanico}")]
        public ActionResult IngresarReserva(int id_usuario, string patente, DateTime fecha, string hora, int servicio, int mecanico)
        {
            var result = empleadoRepositorie.CrearReserva(id_usuario, patente, fecha, hora, servicio, mecanico);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/GenerarDocumento/{id}/{neto}/{iva}/{total}/{id_cliente}/{patente}/{id_empleado}/{fecha}/{id_tipo_servicio}/{producto_servicio1}/{producto_servicio2}/{producto_servicio3}/{producto_servicio4}/{producto_servicio5}/{cantidad1}/{cantidad2}/{cantidad3}/{cantidad4}/{cantidad5}/{id_medio_pago}")]
        public ActionResult GenerarDocumento(int id, float neto, float iva, float total, int id_cliente, string patente, int id_empleado, DateTime fecha, int id_tipo_servicio, int producto_servicio1, int producto_servicio2, int producto_servicio3, int producto_servicio4, int producto_servicio5, int cantidad1, int cantidad2, int cantidad3, int cantidad4, int cantidad5, int id_medio_pago)
        {
            var result = empleadoRepositorie.GenerarDocumento(id, neto, iva, total, id_cliente, patente, id_empleado, fecha, id_tipo_servicio, producto_servicio1, producto_servicio2, producto_servicio3, producto_servicio4, producto_servicio5, cantidad1, cantidad2, cantidad3, cantidad4, cantidad5, id_medio_pago);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

    }
}