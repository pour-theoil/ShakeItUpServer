using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShakeitServer.Models;
using ShakeitServer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private IIngredientRepository _ingredientRepository;

        public IngredientController(IIngredientRepository ingredientRepository)
        {
            _ingredientRepository = ingredientRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ingredientRepository.GetAllIngredients());
        }

        [HttpPost]
        public IActionResult AddIngredient(Ingredient ingredient)
        {
            _ingredientRepository.AddIngredient(ingredient);
            return CreatedAtAction("Get", new { id = ingredient.Id }, ingredient);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _ingredientRepository.DeleteIngredient(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var ingredient = _ingredientRepository.GetIngredientById(id);
            if(ingredient == null)
            {
                return NotFound();
            }
            return Ok(ingredient);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Ingredient ingredient)
        {
            if (id != ingredient.Id)
            {
                return BadRequest();
            }

            _ingredientRepository.UpdateIngredient(ingredient);
            return Ok(ingredient);
        }
    }
}
