using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class CocktailIngredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Pour { get; set; }
    }
}
