using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShakeitServer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShakeitServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CocktailController : ControllerBase
    {
        private readonly ICocktailRepository _cocktailRepository;
        
        public CocktailController(ICocktailRepository cocktailRepository)
        {
            _cocktailRepository = cocktailRepository;
        }

        [HttpGet("numIngredients/{id}")]
        public IActionResult GetNumIngredients(int id)
        {
            return Ok(_cocktailRepository.NumIngredientInCocktails(id));
        }

        [HttpGet("numCocktails/{id}")]
        public IActionResult GetNumCocktails(int id)
        {
            return Ok(_cocktailRepository.NumberCocktailsOnMenu(id));
        }

        [HttpGet("ingredients/{id}")]
        public IActionResult GetCocktailIngredients(int id)
        {
            return Ok(_cocktailRepository.CocktailIngredients(id));
        }

    }
}
