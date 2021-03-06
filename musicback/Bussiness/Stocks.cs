using Microsoft.Extensions.Configuration;
using musicback.Core;
using musicback.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace musicback.Bussiness
{
    public class Stocks : CoreConnection
    { /// <summary>
      /// Se crea una instancia de la clase
      /// </summary>
      /// <param name="configuration">The configuration.</param>

        public Stocks(IConfiguration configuration) : base(configuration) { }
        /// <summary>
        /// Gets the todos.
        /// </summary>
        /// <param name="opc">The opc.</param>
        /// <param name="filter">The filter.</param>
        /// <returns>List&lt;Campanha&gt;.</returns>
        public List<Stock> GetTodos(int opc, Stock filter)
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
        public Stock GetRegistro(int id)
        {
            var ds = Execute(1, 2, new Stock() { id = id });
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
        public bool SaveRegistro(int opc, Stock data)
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
        public Stock SaveRegistro2(int opc, Stock data)
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
            Execute(3, 2, new Stock() { id = id });
            return true;
        }

        /// <summary>
        /// Executes the specified accion.
        /// </summary>
        /// <param name="accion">The accion.</param>
        /// <param name="opcion">The opcion.</param>
        /// <param name="data">The data.</param>
        /// <returns>DataSet.</returns>
        private DataSet Execute(int accion, int opcion = 1, Stock data = null)
        {
            OpenCon();
            var p = new List<DataParam>(){
            new DataParam("ACCION", DataParam.ParamType.INT, accion),
            new DataParam("OPCION", DataParam.ParamType.INT, opcion),
        };
            if (data != null)
            {
                p.Add(new DataParam("id", DataParam.ParamType.INT, data.id));
                p.Add(new DataParam("id_prod", DataParam.ParamType.INT, data.id_prod));
                p.Add(new DataParam("id_suc", DataParam.ParamType.INT, data.id_suc));
                p.Add(new DataParam("cantidad", DataParam.ParamType.INT, data.cantidad));
                p.Add(new DataParam("fecha", DataParam.ParamType.SMALLDATETIME, data.fecha));
            }
            var ds = ExecuteProcedure("dbo.sp_inventarios", p);
            CloseCon();
            return ds;
        }

        private List<Stock> SetModel(DataSet ds)
        {
            var lst = new List<Stock>();
            lst.AddRange(from DataRow dr in ds.Tables[0].Rows
                         select new Stock
                         {
                             id = GetField(dr, "id").ValidateInt32() ?? 0,
                             id_prod = GetField(dr, "id_prod").ValidateInt32() ?? 0,
                             nom_prod = GetField(dr, "nom_prod").ValidateString() ?? "",
                             id_suc = GetField(dr, "id_suc").ValidateInt32() ?? 0,
                             nom_suc = GetField(dr, "nom_suc").ValidateString() ?? "",
                             cantidad = GetField(dr, "cantidad").ValidateInt32() ?? 0,
                             fecha = GetField(dr, "fecha_actualizacion").ValidateDateTime() ?? null,
                         });
            return lst;
        }
    }
}

