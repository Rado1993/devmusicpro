using Serviexpress.Entities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Serviexpress.Repositories
{
    public interface IEmpleadoRepositorie
    {
        object GetEmpleadoList();
        object GetClientesList();
        object GetProveedoresList();
        object GetTOrdenList();
        object CancelarOrden(long id);
        object GetEmpleadoPorID(int empID);
        object GetReservasList();
        object GetReservaPorID(int resID);
        object GetOrdenPorID(int orden_id);
        DataTable ObtenerExcel();
        object GetTipoServiciosList();
        object GetMecanicos();
        object GetServicios();
        object GetTReservasList();
        object GetTDocumentosList();
        object GuardarOrden(long id, long estado, long id_proveedor, long id_empleado, DateTime fecha, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5);
        object GetLogin(string nombre, string clave);
        object ObtenerUsuario(int id);
        object CrearReserva(int id_usuario, string patente, DateTime fecha, string hora, int servicio, int mecanico);
        object GenerarDocumento(int id, float neto, float iva, float total, int id_cliente, string patente, int id_empleado, DateTime fecha, int id_tipo_servicio, int producto_servicio1, int producto_servicio2, int producto_servicio3, int producto_servicio4, int producto_servicio5, int cantidad1, int cantidad2, int cantidad3, int cantidad4, int cantidad5, int id_medio_pago);
        object CrearCliente(string rut, string nombre, string direccion, string telefono, string email, string nombre_usuario, string clave, int tipo);
        object CrearEmpleado(string rut, string nombre, string apellido, string email, string nombre_usuario, string clave, int tipo_empleado, int tipo);
        object AgregarServicio(string nombre, int valor);
        object AgregarProducto(int servicio, string nombre, int valor);
        object AgregarProveedor(int moneda, string nombre, string rubro, string telefono, string email);
        object GuardarServicio(long id, long estado, string detalle, long id_cliente, string patente, long id_empleado, DateTime fecha, string hora, int id_tipo_servicio, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5);
        object AnularDocumento(long id);
        object CrearUsuario(string rut, string nombre, string direccion, string telefono, string email, string nombre_usuario, string clave, int tipo);
        object CrearEmpleado2(string rut, string nombre, string apellido, string nombre_usuario, string clave, int tipo, int tipo_empleado);
    }
}
