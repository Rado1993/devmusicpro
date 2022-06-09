using Microsoft.Extensions.Configuration;
using musicback.Core;
using musicback.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace musicback.Bussiness
{
    public class Ventas : CoreConnection
    { /// <summary>
      /// Se crea una instancia de la clase
      /// </summary>
      /// <param name="configuration">The configuration.</param>

        public Ventas(IConfiguration configuration) : base(configuration) { }
        /// <summary>
        /// Gets the todos.
        /// </summary>
        /// <param name="opc">The opc.</param>
        /// <param name="filter">The filter.</param>
        /// <returns>List&lt;Campanha&gt;.</returns>
        public List<Venta> GetTodos(int opc, Venta filter)
        {
            var ds = Execute(1, opc, filter);
            var lst = SetModel(ds);
            return lst;
        }

        /// <summary>
        /// Gets the registro.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns>Modulo.</returns>
        public Venta GetRegistro(int id)
        {
            var ds = Execute(1, 2, new Venta() { id = id });
            var lst = SetModel(ds);
            if (lst.Count > 0)
                return lst[0];
            return null;
        }

        /// <summary>
        /// Saves the registro.
        /// </summary>
        /// <param name="opc">The opc.</param>
        /// <param name="data">The data.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool SaveRegistro(int opc, Venta data)
        {
            if (data.id == 0)
            {
                Execute(2, opc, data);
            }
            else
            {
                Execute(3, opc, data);
            }
            return true;
        }

        /// <summary>
        /// Saves the registro.
        /// </summary>
        /// <param name="opc">The opc.</param>
        /// <param name="data">The data.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public Venta SaveRegistro2(int opc, Venta data)
        {
            var ds = Execute(2, opc, data);
            var lst = SetModel(ds);
            if (lst.Count > 0)
                return lst[0];
            return null;
        }

        /// <summary>
        /// Actives the registro.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns><c>true</c> if XXXX, <c>false</c> otherwise.</returns>
        public bool ActiveRegistro(int id)
        {
            Execute(3, 2, new Venta() { id = id });
            return true;
        }

        /// <summary>
        /// Executes the specified accion.
        /// </summary>
        /// <param name="accion">The accion.</param>
        /// <param name="opcion">The opcion.</param>
        /// <param name="data">The data.</param>
        /// <returns>DataSet.</returns>
        private DataSet Execute(int accion, int opcion = 1, Venta data = null)
        {
            OpenCon();
            var p = new List<DataParam>(){
            new DataParam("ACCION", DataParam.ParamType.INT, accion),
            new DataParam("OPCION", DataParam.ParamType.INT, opcion),
        };
            if (data != null)
            {
                p.Add(new DataParam("id", DataParam.ParamType.INT, data.id));
                p.Add(new DataParam("detalle", DataParam.ParamType.VARCHAR, data.detalle));
                p.Add(new DataParam("cantidad", DataParam.ParamType.INT, data.cantidad));
                p.Add(new DataParam("fecha_venta", DataParam.ParamType.SMALLDATETIME, data.fecha_venta));
                p.Add(new DataParam("valor_unitario", DataParam.ParamType.INT, data.valor_unitario));
                p.Add(new DataParam("valor_total", DataParam.ParamType.INT, data.valor_total));
                p.Add(new DataParam("valor_neto", DataParam.ParamType.INT, data.valor_neto));
                p.Add(new DataParam("id_usuario", DataParam.ParamType.INT, data.id_usuario));
                p.Add(new DataParam("id_prod", DataParam.ParamType.INT, data.id_prod));
                p.Add(new DataParam("id_suc", DataParam.ParamType.INT, data.id_suc));
                p.Add(new DataParam("id_stock", DataParam.ParamType.INT, data.id_stock));
                p.Add(new DataParam("id_estado", DataParam.ParamType.INT, data.id_estado));
            }
            var ds = ExecuteProcedure("dbo.sp_ventas", p);
            CloseCon();
            return ds;
        }

        private List<Venta> SetModel(DataSet ds)
        {
            var lst = new List<Venta>();
            lst.AddRange(from DataRow dr in ds.Tables[0].Rows
                         select new Venta
                         {
                             id = GetField(dr, "id").ValidateInt32() ?? 0,
                             detalle = GetField(dr, "detalle").ValidateString() ?? "",
                             cantidad = GetField(dr, "cantidad").ValidateInt32() ?? 0,
                             fecha_venta = GetField(dr, "fecha_venta").ValidateDateTime() ?? null,
                             valor_unitario = GetField(dr, "valor_unitario").ValidateInt32() ?? 0,
                             valor_total = GetField(dr, "valor_total").ValidateInt32() ?? 0,
                             valor_neto = GetField(dr, "valor_neto").ValidateInt32() ?? 0,
                             id_usuario = GetField(dr, "id_usuario").ValidateInt32() ?? 0,
                             id_prod = GetField(dr, "id_prod").ValidateInt32() ?? 0,
                             id_suc = GetField(dr, "id_suc").ValidateInt32() ?? 0,
                             id_stock = GetField(dr, "id_stock").ValidateInt32() ?? 0,
                             id_estado = GetField(dr, "id_estado").ValidateInt32() ?? 0,
                         });
            return lst;
        }
    }
}

