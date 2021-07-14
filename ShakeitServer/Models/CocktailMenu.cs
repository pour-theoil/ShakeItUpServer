using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class CocktailMenu
    {
        public int Id { get; set; }
        public int CocktailId { get; set; }
        public int MenuId { get; set; }
    }
}
