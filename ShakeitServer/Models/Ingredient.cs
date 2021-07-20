using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IngredientTypeId { get; set; }  
        public int UserProfileId { get; set; }
        public int IsDeleted { get; set; }
        public int Abv { get; set; }
        public IngredientType IngredientType { get; set; }
    }
}
