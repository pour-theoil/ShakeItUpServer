using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class Cocktail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<CocktailIngredient> Ingredients { get; set; }
        public int UserProfileId { get; set; }
        public int MenuId { get; set; }
    }
}
