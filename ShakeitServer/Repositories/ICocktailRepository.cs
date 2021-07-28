using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface ICocktailRepository
    {
        public List<Cocktail> GetAllCocktails();
        public Cocktail GetCocktailById(int id);
        public void AddCocktail(Cocktail cocktail);
        public void UpdateCocktail(Cocktail cocktail);
        public void DeleteCocktail(int cocktailId);
        public int NumCocktails(int id);
    }
}
