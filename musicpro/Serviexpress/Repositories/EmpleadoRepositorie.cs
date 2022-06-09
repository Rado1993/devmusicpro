using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using Microsoft.Extensions.Configuration;
using Serviexpress.Repositories;
using Dapper;
using Serviexpress.DataAccess;
using System.Data;
using Serviexpress.Entities;
using System.Data.SqlClient;
using System.Reflection;

namespace Serviexpress.Repositories
{
        public class EmpleadoRepositorie : IEmpleadoRepositorie
        {
            IConfiguration configuration;
            public EmpleadoRepositorie(IConfiguration _configuration)
            {
                configuration = _configuration;
            }
            public object GetEmpleadoPorID(int empId)
            {
                object result = null;
                try
                {
                    var dyParam = new OracleDynamicParameters();
                    dyParam.Add("EMP_ID", OracleDbType.Int32, ParameterDirection.Input, empId);
                    dyParam.Add("EMP_DETAIL_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                    var conn = this.GetConnection();
                    if (conn.State == ConnectionState.Closed)
                    {
                        conn.Open();
                    }

                    if (conn.State == ConnectionState.Open)
                    {
                        var query = "SP_EMPLEADO_POR_ID";

                        result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return result;
            }

            public object GetEmpleadoList()
            {
                object result = null;
                try
                {
                    var dyParam = new OracleDynamicParameters();

                    dyParam.Add("EMPCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                    var conn = this.GetConnection();
                    if (conn.State == ConnectionState.Closed)
                    {
                        conn.Open();
                    }

                    if (conn.State == ConnectionState.Open)
                    {
                        var query = "SP_LISTADOEMPLEADOS";

                        result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }

                return result;
            }

        public object GetClientesList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("CLCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_CLIENTES";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetReservasList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADORESERVAS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetReservaPorID(int empId)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("RES_ID", OracleDbType.Int32, ParameterDirection.Input, empId);
                dyParam.Add("RES_DETAIL_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_RESERVA_POR_ID";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetOrdenPorID(int orden_id)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("ORD_ID", OracleDbType.Int32, ParameterDirection.Input, orden_id);
                dyParam.Add("ORD_DETAIL_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_ORDEN_POR_ID";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetTipoServiciosList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("TSERVCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_TIPOSERVICIOS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetProveedoresList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("PROBCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_PROVEEDORES";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetMecanicos()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("MECCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_MECANICOS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetServicios()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("MECCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_SERVICIOS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetTReservasList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_RESERVAS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetTDocumentosList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_DOCUMENTOS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GetTOrdenList()
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_ORDEN";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public DataTable ObtenerExcel()
        {
            DataTable items = new DataTable();
            dynamic result = null;
            DataSet ds = new DataSet();
            var pruebameesta = "";
            try
            {
                var dyParam = new OracleDynamicParameters();

                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_LISTADO_DOCUMENTOS";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);

                    DataColumn colum1 = new DataColumn("ID_MEDIO_PAGO");
                    items.Columns.Add(colum1);
                    DataColumn colum2 = new DataColumn("NOM_EMPLEADO");
                    items.Columns.Add(colum2);
                    DataColumn colum3 = new DataColumn("NOMBRE");
                    items.Columns.Add(colum3);
                    DataColumn colum4 = new DataColumn("PATENTE");
                    items.Columns.Add(colum4);
                    DataColumn colum5 = new DataColumn("DESCRIPCION");
                    items.Columns.Add(colum5);
                    DataColumn colum6 = new DataColumn("TOTAL");
                    items.Columns.Add(colum6);
                    DataColumn colum7 = new DataColumn("ANULADO");
                    items.Columns.Add(colum7);
                    DataRow row1 = items.NewRow();
                    DataRow row2 = items.NewRow();
                    DataRow row3 = items.NewRow();
                    DataRow row4 = items.NewRow();
                    DataRow row5 = items.NewRow();
                    DataRow row6 = items.NewRow();
                    DataRow row7 = items.NewRow();


                    var nombreEmpleado = "";
                    var count = 0;
                    var count2 = 0;
                    foreach (dynamic i in result)
                    {
                            foreach (dynamic e in i)
                            {
                                if (count == 15) {
                                        count2++;
                                        count=0;
                                    }
                                if (count2 == 0)
                                {
                                    //count = count == 15 ? 0 : count;
                                    
                                    if (count == 6)
                                    {
                                        row1["ID_MEDIO_PAGO"] = e.Value == 2 ? "Boleta" : "Factura";
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 9)
                                    {
                                        nombreEmpleado = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 10)
                                    {
                                        row1["NOM_EMPLEADO"] = nombreEmpleado + " " + e.Value;
                                        nombreEmpleado = "";
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 8)
                                    {
                                        row1["NOMBRE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 12)
                                    {
                                        row1["PATENTE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 14)
                                    {
                                        row1["DESCRIPCION"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 5)
                                    {
                                        row1["TOTAL"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 1)
                                    {
                                        row1["ANULADO"] = e.Value == 1 ? "Anulado" : "";
                                    //items.Rows.Add(row1);
                                }
                                    count++;
                                }
                                if (count2 == 1) {
                                    if (count == 6)
                                    {
                                        row2["ID_MEDIO_PAGO"] = e.Value == 2 ? "Boleta" : "Factura";
                                    //items.Rows.Add(row1);
                                }
                                    if (count == 9)
                                    {
                                        nombreEmpleado = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 10)
                                    {
                                        row2["NOM_EMPLEADO"] = nombreEmpleado + " " + e.Value;
                                        nombreEmpleado = "";
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 8)
                                    {
                                        row2["NOMBRE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 12)
                                    {
                                        row2["PATENTE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 14)
                                    {
                                        row2["DESCRIPCION"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 5)
                                    {
                                        row2["TOTAL"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 1)
                                    {
                                        row2["ANULADO"] = e.Value == 1 ? "Anulado" : "";
                                    //items.Rows.Add(row1);
                                }
                                    count++;
                                }
                                if (count2 == 2)
                                {
                                    if (count == 6)
                                    {
                                        row3["ID_MEDIO_PAGO"] = e.Value == 2 ? "Boleta" : "Factura";
                                    //items.Rows.Add(row1);
                                }
                                    if (count == 9)
                                    {
                                        nombreEmpleado = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 10)
                                    {
                                        row3["NOM_EMPLEADO"] = nombreEmpleado + " " + e.Value;
                                        nombreEmpleado = "";
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 8)
                                    {
                                        row3["NOMBRE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 12)
                                    {
                                        row3["PATENTE"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 14)
                                    {
                                        row3["DESCRIPCION"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 5)
                                    {
                                        row3["TOTAL"] = e.Value;
                                        //items.Rows.Add(row1);
                                    }
                                    if (count == 1)
                                    {
                                        row3["ANULADO"] = e.Value == 1 ? "Anulado" : "";
                                    //items.Rows.Add(row1);
                                }
                                    count++;
                                }
                            if (count2 == 3)
                            {
                                if (count == 6)
                                {
                                    row4["ID_MEDIO_PAGO"] = e.Value == 2 ? "Boleta" : "Factura";
                                    //items.Rows.Add(row1);
                                }
                                if (count == 9)
                                {
                                    nombreEmpleado = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 10)
                                {
                                    row4["NOM_EMPLEADO"] = nombreEmpleado + " " + e.Value;
                                    nombreEmpleado = "";
                                    //items.Rows.Add(row1);
                                }
                                if (count == 8)
                                {
                                    row4["NOMBRE"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 12)
                                {
                                    row4["PATENTE"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 14)
                                {
                                    row4["DESCRIPCION"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 5)
                                {
                                    row4["TOTAL"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 1)
                                {
                                    row4["ANULADO"] = e.Value == 1 ? "Anulado" : "";
                                    //items.Rows.Add(row1);
                                }
                                count++;
                            }
                            if (count2 == 4)
                            {
                                if (count == 6)
                                {
                                    row5["ID_MEDIO_PAGO"] = e.Value == 2 ? "Boleta" : "Factura";
                                    //items.Rows.Add(row1);
                                }
                                if (count == 9)
                                {
                                    nombreEmpleado = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 10)
                                {
                                    row5["NOM_EMPLEADO"] = nombreEmpleado + " " + e.Value;
                                    nombreEmpleado = "";
                                    //items.Rows.Add(row1);
                                }
                                if (count == 8)
                                {
                                    row5["NOMBRE"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 12)
                                {
                                    row5["PATENTE"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 14)
                                {
                                    row5["DESCRIPCION"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 5)
                                {
                                    row5["TOTAL"] = e.Value;
                                    //items.Rows.Add(row1);
                                }
                                if (count == 1)
                                {
                                    row5["ANULADO"] = e.Value == 1 ? "Anulado" : "";
                                    //items.Rows.Add(row1);
                                }
                                count++;
                            }

                        }
                        

                    }
                    items.Rows.Add(row1);
                    items.Rows.Add(row2);
                    items.Rows.Add(row3);
                    items.Rows.Add(row4);
                    items.Rows.Add(row5);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return items;
        }
        private DataTable ConvertToDataTable(Object[] array)
        {
            PropertyInfo[] properties = array.GetType().GetElementType().GetProperties();
            DataTable dt = CreateDataTable(properties);
            if (array.Length != 0)
            {
                foreach (object o in array)
                    FillData(properties, dt, o);
            }
            return dt;
        }

        private DataTable CreateDataTable(PropertyInfo[] properties)

        {
            DataTable dt = new DataTable();
            DataColumn dc = null;
            foreach (PropertyInfo pi in properties)
            {
                dc = new DataColumn();
                dc.ColumnName = pi.Name;
                dc.DataType = pi.PropertyType;
                dt.Columns.Add(dc);
            }
            return dt;
        }

        private void FillData(PropertyInfo[] properties, DataTable dt, Object o)
        {
            DataRow dr = dt.NewRow();
            foreach (PropertyInfo pi in properties)
            {
                dr[pi.Name] = pi.GetValue(o, null);
            }
            dt.Rows.Add(dr);
        }


        public IDbConnection GetConnection()
            {
                var connectionString = configuration.GetSection("ConnectionStrings").GetSection("EmployeeConnection").Value;
                var conn = new OracleConnection(connectionString);
                return conn;
            }

        public object GetLogin(string nombre, string clave)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("US_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("US_CLAVE", OracleDbType.Varchar2, ParameterDirection.Input, clave);
                dyParam.Add("LOGIN_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_OBTENER_LOGIN";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object ObtenerUsuario(int id)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("ID_CLIENTE", OracleDbType.Varchar2, ParameterDirection.Input, id);
                dyParam.Add("USUARIO_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_OBTENER_CLIENTE";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CrearReserva(int id_usuario, string patente, DateTime fecha, string hora, int servicio, int mecanico)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("RV_ID_USER", OracleDbType.Int32, ParameterDirection.Input, id_usuario);
                dyParam.Add("RV_PATENTE", OracleDbType.Varchar2, ParameterDirection.Input, patente);
                dyParam.Add("RV_FECHA", OracleDbType.Date, ParameterDirection.Input, fecha);
                dyParam.Add("RV_HORA", OracleDbType.Varchar2, ParameterDirection.Input, hora);
                dyParam.Add("RV_SERVICIO", OracleDbType.Int32, ParameterDirection.Input, servicio);
                dyParam.Add("RV_MECANICO", OracleDbType.Int32, ParameterDirection.Input, mecanico);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_CREAR_RESERVA";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CrearCliente(string rut, string nombre, string direccion, string telefono, string email, string nombre_usuario, string clave, int tipo)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("CL_RUT", OracleDbType.Varchar2, ParameterDirection.Input, rut);
                dyParam.Add("CL_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("CL_DIRECCION", OracleDbType.Varchar2, ParameterDirection.Input, direccion);
                dyParam.Add("CL_TELEFONO", OracleDbType.Varchar2, ParameterDirection.Input, telefono);
                dyParam.Add("CL_EMAIL", OracleDbType.Varchar2, ParameterDirection.Input, email);
                dyParam.Add("CL_NOMBRE_USUARIO", OracleDbType.Varchar2, ParameterDirection.Input, nombre_usuario);
                dyParam.Add("CL_CLAVE", OracleDbType.Varchar2, ParameterDirection.Input, clave);
                dyParam.Add("CL_TIPO", OracleDbType.Int32, ParameterDirection.Input, tipo);
                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_INSERTAR_CLIENTE";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    Console.WriteLine(result);
                    dynamic resultado = result;
                    CrearUsuario(rut, nombre, direccion, telefono, email, nombre_usuario, clave, tipo);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CrearEmpleado(string rut, string nombre, string apellido, string email, string nombre_usuario, string clave, int tipo_empleado, int tipo)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("CL_RUT", OracleDbType.Varchar2, ParameterDirection.Input, rut);
                dyParam.Add("CL_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("CL_APELLIDO", OracleDbType.Varchar2, ParameterDirection.Input, apellido);
                dyParam.Add("CL_EMAIL", OracleDbType.Varchar2, ParameterDirection.Input, email);
                dyParam.Add("CL_NOMBRE_USUARIO", OracleDbType.Varchar2, ParameterDirection.Input, nombre_usuario);
                dyParam.Add("CL_CLAVE", OracleDbType.Varchar2, ParameterDirection.Input, clave);
                dyParam.Add("CL_TIPO_EMPLEADO", OracleDbType.Int32, ParameterDirection.Input, tipo_empleado);
                dyParam.Add("CL_TIPO", OracleDbType.Int32, ParameterDirection.Input, tipo);
                dyParam.Add("RESCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_INSERTAR_EMPLEADO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    Console.WriteLine(result);
                    dynamic resultado = result;
                    CrearEmpleado2(rut, nombre, apellido, nombre_usuario, clave, tipo, tipo_empleado);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object AgregarServicio(string nombre, int valor)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("SV_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("SV_VALOR", OracleDbType.Int32, ParameterDirection.Input, valor);
                dyParam.Add("SVCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_AGREGAR_SERVICIO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    Console.WriteLine(result);
                    dynamic resultado = result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object AgregarProducto(int servicio, string nombre, int valor)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("PR_SERVICIO", OracleDbType.Int32, ParameterDirection.Input, servicio);
                dyParam.Add("PR_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("PR_VALOR", OracleDbType.Int32, ParameterDirection.Input, valor);
                dyParam.Add("SVCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_AGREGAR_PRODUCTO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    Console.WriteLine(result);
                    dynamic resultado = result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object AgregarProveedor(int moneda, string nombre, string rubro, string telefono, string email)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("PR_MONEDA", OracleDbType.Int32, ParameterDirection.Input, moneda);
                dyParam.Add("PR_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("PR_RUBRO", OracleDbType.Varchar2, ParameterDirection.Input, rubro);
                dyParam.Add("PR_TELEFONO", OracleDbType.Varchar2, ParameterDirection.Input, telefono);
                dyParam.Add("PR_EMAIL", OracleDbType.Varchar2, ParameterDirection.Input, email);
                dyParam.Add("SVCURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_AGREGAR_PROVEEDOR";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                    Console.WriteLine(result);
                    dynamic resultado = result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CrearEmpleado2(string rut, string nombre, string apellido, string nombre_usuario, string clave, int tipo, int tipo_empleado)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("CL_RUT", OracleDbType.Varchar2, ParameterDirection.Input, rut);
                dyParam.Add("CL_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("CL_APELLIDO", OracleDbType.Varchar2, ParameterDirection.Input, apellido);
                dyParam.Add("CL_NOMBRE_USUARIO", OracleDbType.Varchar2, ParameterDirection.Input, nombre_usuario);
                dyParam.Add("CL_CLAVE", OracleDbType.Varchar2, ParameterDirection.Input, clave);
                dyParam.Add("CL_TIPO_EMPLEADO", OracleDbType.Int32, ParameterDirection.Input, tipo_empleado);
                dyParam.Add("CL_TIPO", OracleDbType.Int32, ParameterDirection.Input, tipo);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_INSERTAR_EMPLEADO2";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CrearUsuario(string rut, string nombre, string direccion, string telefono, string email, string nombre_usuario, string clave, int tipo)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("CL_RUT", OracleDbType.Varchar2, ParameterDirection.Input, rut);
                dyParam.Add("CL_NOMBRE", OracleDbType.Varchar2, ParameterDirection.Input, nombre);
                dyParam.Add("CL_DIRECCION", OracleDbType.Varchar2, ParameterDirection.Input, direccion);
                dyParam.Add("CL_TELEFONO", OracleDbType.Varchar2, ParameterDirection.Input, telefono);
                dyParam.Add("CL_EMAIL", OracleDbType.Varchar2, ParameterDirection.Input, email);
                dyParam.Add("CL_NOMBRE_USUARIO", OracleDbType.Varchar2, ParameterDirection.Input, nombre_usuario);
                dyParam.Add("CL_CLAVE", OracleDbType.Varchar2, ParameterDirection.Input, clave);
                dyParam.Add("CL_TIPO", OracleDbType.Int32, ParameterDirection.Input, tipo);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_INSERTAR_USUARIO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GuardarServicio(long id, long estado, string detalle, long id_cliente, string patente, long id_empleado, DateTime fecha, string hora, int id_tipo_servicio, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("ID_SV", OracleDbType.Int32, ParameterDirection.Input, id);
                dyParam.Add("ESTADO_SV", OracleDbType.Int32, ParameterDirection.Input, estado);
                dyParam.Add("DETALLE_SV", OracleDbType.Varchar2, ParameterDirection.Input, detalle);
                dyParam.Add("ID_CLIENTE", OracleDbType.Int32, ParameterDirection.Input, id_cliente);
                dyParam.Add("PATENTE", OracleDbType.Varchar2, ParameterDirection.Input, patente);
                dyParam.Add("ID_EMPLEADO", OracleDbType.Int32, ParameterDirection.Input, id_empleado);
                dyParam.Add("FECHA", OracleDbType.Date, ParameterDirection.Input, fecha);
                dyParam.Add("HORA", OracleDbType.Varchar2, ParameterDirection.Input, hora);
                dyParam.Add("SV_ID_TIPO_SERVICIO", OracleDbType.Int32, ParameterDirection.Input, id_tipo_servicio);
                dyParam.Add("PRODUCTO1", OracleDbType.Int32, ParameterDirection.Input, producto_servicio1);
                dyParam.Add("PRODUCTO2", OracleDbType.Int32, ParameterDirection.Input, producto_servicio2);
                dyParam.Add("PRODUCTO3", OracleDbType.Int32, ParameterDirection.Input, producto_servicio3);
                dyParam.Add("PRODUCTO4", OracleDbType.Int32, ParameterDirection.Input, producto_servicio4);
                dyParam.Add("PRODUCTO5", OracleDbType.Int32, ParameterDirection.Input, producto_servicio5);
                dyParam.Add("CANTIDAD_1", OracleDbType.Varchar2, ParameterDirection.Input, cantidad1);
                dyParam.Add("CANTIDAD_2", OracleDbType.Varchar2, ParameterDirection.Input, cantidad2);
                dyParam.Add("CANTIDAD_3", OracleDbType.Varchar2, ParameterDirection.Input, cantidad3);
                dyParam.Add("CANTIDAD_4", OracleDbType.Varchar2, ParameterDirection.Input, cantidad4);
                dyParam.Add("CANTIDAD_5", OracleDbType.Varchar2, ParameterDirection.Input, cantidad5);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_GUARDAR_SERVICIO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GuardarOrden(long id, long estado, long id_proveedor, long id_empleado, DateTime fecha, long producto_servicio1, long producto_servicio2, long producto_servicio3, long producto_servicio4, long producto_servicio5, string cantidad1, string cantidad2, string cantidad3, string cantidad4, string cantidad5)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("OR_ID", OracleDbType.Int32, ParameterDirection.Input, id);
                dyParam.Add("OR_ESTADO", OracleDbType.Int32, ParameterDirection.Input, estado);
                dyParam.Add("OR_ID_PROVEEDOR", OracleDbType.Int32, ParameterDirection.Input, id_proveedor);
                dyParam.Add("OR_ID_EMPLEADO", OracleDbType.Int32, ParameterDirection.Input, id_empleado);
                dyParam.Add("OR_FECHA", OracleDbType.Date, ParameterDirection.Input, fecha);
                dyParam.Add("OR_PRODUCTO1", OracleDbType.Int32, ParameterDirection.Input, producto_servicio1);
                dyParam.Add("OR_PRODUCTO2", OracleDbType.Int32, ParameterDirection.Input, producto_servicio2);
                dyParam.Add("OR_PRODUCTO3", OracleDbType.Int32, ParameterDirection.Input, producto_servicio3);
                dyParam.Add("OR_PRODUCTO4", OracleDbType.Int32, ParameterDirection.Input, producto_servicio4);
                dyParam.Add("OR_PRODUCTO5", OracleDbType.Int32, ParameterDirection.Input, producto_servicio5);
                dyParam.Add("OR_CANTIDAD_1", OracleDbType.Varchar2, ParameterDirection.Input, cantidad1);
                dyParam.Add("OR_CANTIDAD_2", OracleDbType.Varchar2, ParameterDirection.Input, cantidad2);
                dyParam.Add("OR_CANTIDAD_3", OracleDbType.Varchar2, ParameterDirection.Input, cantidad3);
                dyParam.Add("OR_CANTIDAD_4", OracleDbType.Varchar2, ParameterDirection.Input, cantidad4);
                dyParam.Add("OR_CANTIDAD_5", OracleDbType.Varchar2, ParameterDirection.Input, cantidad5);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_GUARDAR_ORDEN";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object AnularDocumento(long id)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("ID_DOC", OracleDbType.Int32, ParameterDirection.Input, id);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_ANULAR_DOCUMENTO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object CancelarOrden(long id)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("ID_OR", OracleDbType.Int32, ParameterDirection.Input, id);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_CANCELAR_ORDEN";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

        public object GenerarDocumento(int id, float neto, float iva, float total, int id_cliente, string patente, int id_empleado, DateTime fecha, int id_tipo_servicio, int producto_servicio1, int producto_servicio2, int producto_servicio3, int producto_servicio4, int producto_servicio5, int cantidad1, int cantidad2, int cantidad3, int cantidad4, int cantidad5, int id_medio_pago)
        {
            object result = null;
            try
            {
                var dyParam = new OracleDynamicParameters();
                dyParam.Add("DC_ID", OracleDbType.Int32, ParameterDirection.Input, id);
                dyParam.Add("DC_NETO", OracleDbType.BinaryFloat, ParameterDirection.Input, neto);
                dyParam.Add("DC_IVA", OracleDbType.BinaryFloat, ParameterDirection.Input, iva);
                dyParam.Add("DC_TOTAL", OracleDbType.BinaryFloat, ParameterDirection.Input, total);
                dyParam.Add("DC_ID_CLIENTE", OracleDbType.Int32, ParameterDirection.Input, id_cliente);
                dyParam.Add("DC_PATENTE", OracleDbType.Varchar2, ParameterDirection.Input, patente);
                dyParam.Add("DC_ID_EMPLEADO", OracleDbType.Int32, ParameterDirection.Input, id_empleado);
                dyParam.Add("DC_FECHA", OracleDbType.Date, ParameterDirection.Input, fecha);
                dyParam.Add("DC_ID_TIPO_SERVICIO", OracleDbType.Int32, ParameterDirection.Input, id_tipo_servicio);
                dyParam.Add("DC_PRODUCTO1", OracleDbType.Int32, ParameterDirection.Input, producto_servicio1);
                dyParam.Add("DC_PRODUCTO2", OracleDbType.Int32, ParameterDirection.Input, producto_servicio2);
                dyParam.Add("DC_PRODUCTO3", OracleDbType.Int32, ParameterDirection.Input, producto_servicio3);
                dyParam.Add("DC_PRODUCTO4", OracleDbType.Int32, ParameterDirection.Input, producto_servicio4);
                dyParam.Add("DC_PRODUCTO5", OracleDbType.Int32, ParameterDirection.Input, producto_servicio5);
                dyParam.Add("DC_CANTIDAD_1", OracleDbType.Varchar2, ParameterDirection.Input, cantidad1);
                dyParam.Add("DC_CANTIDAD_2", OracleDbType.Varchar2, ParameterDirection.Input, cantidad2);
                dyParam.Add("DC_CANTIDAD_3", OracleDbType.Varchar2, ParameterDirection.Input, cantidad3);
                dyParam.Add("DC_CANTIDAD_4", OracleDbType.Varchar2, ParameterDirection.Input, cantidad4);
                dyParam.Add("DC_CANTIDAD_5", OracleDbType.Varchar2, ParameterDirection.Input, cantidad5);
                dyParam.Add("DC_ID_MEDIO_PAGO", OracleDbType.Varchar2, ParameterDirection.Input, id_medio_pago);

                var conn = this.GetConnection();
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }

                if (conn.State == ConnectionState.Open)
                {
                    var query = "SP_GUARDAR_DOCUMENTO";

                    result = SqlMapper.Query(conn, query, param: dyParam, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }

    }
}
