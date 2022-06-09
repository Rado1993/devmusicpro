using System;

namespace musicback.Models
{
    public class Venta
    {
        public int id { get; set; }
        public string detalle { get; set; }
        public int cantidad { get; set; }
        public DateTime? fecha_venta { get; set; }
        public int valor_unitario { get; set; }
        public int valor_total { get; set; }
        public int valor_neto { get; set; }
        public int id_usuario { get; set; }
        public int id_prod { get; set; }
        public int id_suc { get; set; }
        public int id_stock { get; set; }
        public int id_estado { get; set; }
    }
}