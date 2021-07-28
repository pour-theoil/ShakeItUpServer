using Microsoft.AspNetCore.Authorization;
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
        private IIngredientTypeRepository _ingredientTypeRepository;

        public IngredientController(IIngredientRepository ingredientRepository,
                                    IIngredientTypeRepository ingredientTypeRepository)
        {
            _ingredientRepository = ingredientRepository;
            _ingredientTypeRepository = ingredientTypeRepository;
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

        [HttpGet("Types")]
        public IActionResult GetTypes()
        {
            return Ok(_ingredientTypeRepository.GetIngredientTypes());
        }
    }
}
