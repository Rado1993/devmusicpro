using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Serviexpress.Repositories;
using Serviexpress.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.CompilerServices;

namespace Serviexpress.Controllers
{
    [Produces("application/json")]
    public class AccountController : Controller
    {
        IEmpleadoRepositorie empleadoRepositorie;
        public AccountController(IEmpleadoRepositorie _empleadoRepositorie)
        {
            empleadoRepositorie = _empleadoRepositorie;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("api/Login/{nombre}/{clave}")]
        public ActionResult Login(string nombre, string clave)
        {
            var result = empleadoRepositorie.GetLogin(nombre, clave);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("api/ObtenerUsuario/{id}")]
        public ActionResult ObtenerUsuario(int id)
        {
            var result = empleadoRepositorie.ObtenerUsuario(id);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("api/CrearCliente/{rut}/{nombre}/{direccion}/{telefono}/{email}/{nombre_usuario}/{clave}/{tipo}")]
        public ActionResult CrearCliente(string rut, string nombre, string direccion, string telefono, string email, string nombre_usuario, string clave, int tipo)
        {
            var result = empleadoRepositorie.CrearCliente(rut, nombre, direccion, telefono, email, nombre_usuario, clave, tipo);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/CrearEmpleado/{rut}/{nombre}/{apellido}/{email}/{nombre_usuario}/{clave}/{tipo_empleado}/{tipo}")]
        public ActionResult CrearEmpleado(string rut, string nombre, string apellido, string email, string nombre_usuario, string clave, int tipo_empleado, int tipo)
        {
            var result = empleadoRepositorie.CrearEmpleado(rut, nombre, apellido, email, nombre_usuario, clave, tipo_empleado, tipo);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/GuardarServicio/{id}/{estado}/{detalle}/{id_cliente}/{patente}/{id_empleado}/{fecha}/{hora}/{id_tipo_servicio}/{producto_servicio1}/{producto_servicio2}/{producto_servicio3}/{producto_servicio4}/{producto_servicio5}/{cantidad1}/{cantidad2}/{cantidad3}/{cantidad4}/{cantidad5}")]
        public ActionResult GuardarServicio(long id, long estado, string detalle, long id_cliente, string patente, long id_empleado, DateTime fecha, string hora, int id_tipo_servicio, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5)
        {
            var result = empleadoRepositorie.GuardarServicio(id, estado, detalle, id_cliente, patente, id_empleado, fecha, hora, id_tipo_servicio, producto_servicio1, producto_servicio2, producto_servicio3, producto_servicio4, producto_servicio5, cantidad1, cantidad2, cantidad3, cantidad4,  cantidad5);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/AnularDocumento/{id}")]
        public ActionResult AnularDocumento(long id)
        {
            var result = empleadoRepositorie.AnularDocumento(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/CancelarOrden/{id}")]
        public ActionResult CancelarOrden(long id)
        {
            var result = empleadoRepositorie.CancelarOrden(id);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/AgregarServicio/{nombre}/{valor}")]
        public ActionResult AgregarServicio(string nombre, int valor)
        {
            var result = empleadoRepositorie.AgregarServicio(nombre, valor);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/AgregarProducto/{servicio}/{nombre}/{valor}")]
        public ActionResult AgregarProducto(int servicio, string nombre, int valor) 
        {
            var result = empleadoRepositorie.AgregarProducto(servicio, nombre, valor);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/AgregarProveedor/{moneda}/{nombre}/{rubro}/{telefono}/{email}")]
        public ActionResult AgregarProveedor(int moneda, string nombre, string rubro, string telefono, string email)
        {
            var result = empleadoRepositorie.AgregarProveedor(moneda, nombre, rubro, telefono, email);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }

        [HttpPost]
        [Route("api/GuardarOrden/{id}/{estado}/{id_proveedor}/{id_empleado}/{fecha}/{producto_servicio1}/{producto_servicio2}/{producto_servicio3}/{producto_servicio4}/{producto_servicio5}/{cantidad1}/{cantidad2}/{cantidad3}/{cantidad4}/{cantidad5}")]
        public ActionResult GuardarOrden(long id, long estado, long id_proveedor, long id_empleado, DateTime fecha, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5)
        {
            var result = empleadoRepositorie.GuardarOrden(id, estado, id_proveedor, id_empleado, fecha, producto_servicio1, producto_servicio2, producto_servicio3, producto_servicio4, producto_servicio5, cantidad1, cantidad2, cantidad3, cantidad4, cantidad5);
            if (result == null)
            {
                return NotFound();
            }

            return Ok("OK");
        }


    }
}