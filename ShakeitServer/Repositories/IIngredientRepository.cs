﻿using ShakeitServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Repositories
{
    public interface IIngredientRepository
    {
        public List<Ingredient> GetAllIngredients(int userProfileId);
        public Ingredient GetIngredientById(int ingredientId, int userProfileId);
        public void AddUserIngredient(int ingredientId, int userProfileId);
        public void DeleteUserIngredient(int ingredientId, int userProfileId);
        public void AddIngredient(Ingredient ingredient);
        public void UpdateIngredient(Ingredient ingredient);
        public void DeleteIngredient(int ingredientId);
        public List<Ingredient> GetIngredientsByType(int typeId, int userProfileId);
    }
}
