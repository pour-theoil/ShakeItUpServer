using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Models
{
    public class Menu
    {
        public int Id { get; set; } 
        public string Name { get; set; }    
        public DateTime DateCreated { get; set; }
        public string Notes { get; set; }
        public int SeasonId { get; set; }
        public Season Season { get; set; }
        public int UserProfileId { get; set; }
        public int IsDeleted { get; set; }

        public List<Cocktail> Cocktails { get; set; }
    }
}
