using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Serviexpress.Entities
{
    public class User
    {
        public string Nombre { get; set; }
        public string Clave { get; set; }
    }
}
