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
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using System.Data;
using System.Reflection;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using LicenseContext = OfficeOpenXml.LicenseContext;

namespace Serviexpress.Controllers
{
    [Produces("application/json")]
    public class ExcelController : Controller
    {

        IEmpleadoRepositorie empleadoRepositorie;
        public ExcelController(IEmpleadoRepositorie _empleadoRepositorie) {
            empleadoRepositorie = _empleadoRepositorie;
        }
        public DataTable ToDataTable<listadopt>(List<listadopt> items)
        {
            DataTable dataTable = new DataTable(typeof(listadopt).Name);
            //Get all the properties by using reflection   
            PropertyInfo[] Props = typeof(listadopt).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                //Setting column names as Property names  
                dataTable.Columns.Add(prop.Name);
            }
            foreach (listadopt item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {



                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;


        }
        public class Listado { 
            public string ID_MEDIO_PAGO { get; set; }
            public string NOM_EMPLEADO { get; set; }
            public string NOMBRE { get; set; }
            public string PATENTE { get; set; }
            public string DESCRIPCION { get; set; }
            public string TOTAL { get; set; }
            public string ANULADO { get; set; }
        }

        [Route("api/GetExportar")]
        public ActionResult Get()
        {
            FileContentResult resultFile = null;
            DataTable result = empleadoRepositorie.ObtenerExcel();

            List<Listado> listado = new List<Listado>();
            listado = (from DataRow dr in result.Rows
                         select new Listado()
                         {
                             ID_MEDIO_PAGO = dr["ID_MEDIO_PAGO"].ToString(),
                             NOM_EMPLEADO = dr["NOM_EMPLEADO"].ToString(),
                             NOMBRE = dr["NOMBRE"].ToString(),
                             PATENTE = dr["PATENTE"].ToString(),
                             DESCRIPCION = dr["DESCRIPCION"].ToString(),
                             TOTAL = dr["TOTAL"].ToString(),
                             ANULADO = dr["ANULADO"].ToString()

                         }).ToList();

            MemoryStream ms = new MemoryStream();
            MemoryStream msCopy = new MemoryStream();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            try
            {
                using (ExcelPackage ep = new ExcelPackage(ms))
                {
                    ExcelWorksheet hoja = ep.Workbook.Worksheets.Add("Resultado Busqueda");
                    DataTable newTable = new DataTable();
                    newTable = ToDataTable(listado);
                    hoja.Cells["A1"].LoadFromDataTable(newTable, true);
                    #region excel

                    //Nuevos nombres a titulos
                    hoja.Cells["A1"].Value = "TIPO";
                    hoja.Cells["B1"].Value = "MECÁNICO";
                    hoja.Cells["C1"].Value = "CLIENTE";
                    hoja.Cells["D1"].Value = "PATENTE";
                    hoja.Cells["E1"].Value = "SERVICIO";
                    hoja.Cells["F1"].Value = "TOTAL";
                    hoja.Cells["G1"].Value = "ESTADO";

                    //Ancho Columnas
                    hoja.Cells["A1:G1"].AutoFitColumns();
                    hoja.Cells["A1"].AutoFitColumns(20);
                    hoja.Cells["B1"].AutoFitColumns(40);
                    hoja.Cells["C1"].AutoFitColumns(40);
                    hoja.Cells["D1"].AutoFitColumns(30);
                    hoja.Cells["E1"].AutoFitColumns(40);
                    hoja.Cells["F1"].AutoFitColumns(20);
                    hoja.Cells["G1"].AutoFitColumns(20);

                    //Estilos
                    hoja.Cells["A1:G1"].Style.Font.Bold = true;
                    hoja.Cells["A1:G1"].Style.Font.Size = 13;
                    hoja.Cells["A1:G1"].Style.Fill.PatternType = ExcelFillStyle.MediumGray;
                    hoja.Cells[hoja.Dimension.Address].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    hoja.Cells[hoja.Dimension.Address].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    hoja.Cells[hoja.Dimension.Address].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    #endregion

                    ep.SaveAs(msCopy);
                }
            }
            catch (Exception ex)
            {

            }

            return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Resultado_Busqueda.xlsx");
        }

    }
}