using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface IIngredientRepository
    {
        public List<Ingredient> GetAllIngredients();
        public Ingredient GetIngredientById(int id);
        public void AddIngredient(Ingredient ingredient);
        public void UpdateIngredient(Ingredient ingredient);
        public void DeleteIngredient(int ingredientId);
    }
}
