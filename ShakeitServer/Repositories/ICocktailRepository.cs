using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface ICocktailRepository
    {
        public List<Cocktail> GetAllCocktails(int id);
        public Cocktail GetCocktailById(int id);
        public void AddCocktail(Cocktail cocktail);
        public void UpdateCocktail(Cocktail cocktail);
        public void DeleteCocktail(int cocktailId, int userId);
        public int NumberCocktailsOnMenu(int menuId);
        public Cocktail CocktailIngredients(int id);
        public int NumIngredientInCocktails(int ingredientId, int userId);
        public void AddCocktailIngredients(Cocktail cocktail);
        public List<Cocktail> GetSeedCocktails(int id);

    }
}
