using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class CocktailIngredients
    {
        public int Id { get; set; }
        public int CocktailId { get; set; }
        public int IngredientId { get; set; }
        public decimal Pour { get; set; }
    }
}