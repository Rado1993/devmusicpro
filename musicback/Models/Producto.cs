using System;

namespace musicback.Models
{
    public class Producto
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public int precio { get; set; }
        public string detalle { get; set; }
        public bool oferta { get; set; }
        public int precio_oferta { get; set; }
        public _BaseModel Categoria { get; set; }
        public _BaseModel SubCategoria { get; set; }
    }
}
