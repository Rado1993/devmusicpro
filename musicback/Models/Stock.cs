using System;

namespace musicback.Models
{
    public class Stock
    {
        public int id { get; set; }
        public int cantidad { get; set; }
        public DateTime? fecha { get; set; }
        public int id_prod { get; set; }
        public string nom_prod { get; set; }
        public int id_suc { get; set; }
        public string nom_suc { get; set; }
    }
}
