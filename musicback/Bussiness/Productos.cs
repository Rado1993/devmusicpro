using Microsoft.Extensions.Configuration;
using musicback.Core;
using musicback.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace musicback.Bussiness
{
    public class Productos : CoreConnection
    { /// <summary>
      /// Se crea una instancia de la clase
      /// </summary>
      /// <param name="configuration">The configuration.</param>
      
        public Productos(IConfiguration configuration) : base(configuration) { }
        /// <summary>
        /// Gets the todos.
        /// </summary>
        /// <param name="opc">The opc.</param>
        /// <param name="filter">The filter.</param>
        /// <returns>List&lt;Campanha&gt;.</returns>
        public List<Producto> GetTodos(int opc, Producto filter)
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
        public Producto GetRegistro(int id)
        {
            var ds = Execute(1, 2, new Producto() { id = id });
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
        public bool SaveRegistro(int opc, Producto data)
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
        public Producto SaveRegistro2(int opc, Producto data)
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
            Execute(3, 2, new Producto() { id = id });
            return true;
        }

        /// <summary>
        /// Executes the specified accion.
        /// </summary>
        /// <param name="accion">The accion.</param>
        /// <param name="opcion">The opcion.</param>
        /// <param name="data">The data.</param>
        /// <returns>DataSet.</returns>
        private DataSet Execute(int accion, int opcion = 1, Producto data = null)
        {
            OpenCon();
            var p = new List<DataParam>(){
            new DataParam("ACCION", DataParam.ParamType.INT, accion),
            new DataParam("OPCION", DataParam.ParamType.INT, opcion),
        };
            if (data != null)
            {
                p.Add(new DataParam("id", DataParam.ParamType.INT, data.id));
            }
            var ds = ExecuteProcedure("dbo.sp_productos", p);
            CloseCon();
            return ds;
        }

        private List<Producto> SetModel(DataSet ds)
        {
            var lst = new List<Producto>();
            lst.AddRange(from DataRow dr in ds.Tables[0].Rows
                         select new Producto
                         {
                             id = GetField(dr, "id").ValidateInt32() ?? 0,
                             nombre = GetField(dr, "nombre").ValidateString() ?? "",
                             precio = GetField(dr, "precio").ValidateInt32() ?? 0,
                             detalle = GetField(dr, "detalle").ValidateString() ?? "",
                             oferta = GetField(dr, "oferta").ValidateBoolean() ?? false,
                             precio_oferta = GetField(dr, "precio_oferta").ValidateInt32() ?? 0,
                             Categoria = new _BaseModel()
                             {
                                 id = GetField(dr, "id_cat").ValidateInt32() ?? 0,
                                 descripcion = GetField(dr, "nombre_cat").ValidateString() ?? "",
                             },
                             SubCategoria = new _BaseModel()
                             {
                                 id = GetField(dr, "id_subcat").ValidateInt32() ?? 0,
                                 descripcion = GetField(dr, "nombre_subcat").ValidateString() ?? "",
                             }
                         });
            return lst;
        }
    }
}
