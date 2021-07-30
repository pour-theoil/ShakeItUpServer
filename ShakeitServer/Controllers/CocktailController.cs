using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShakeitServer.Models;
using ShakeitServer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShakeitServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CocktailController : ControllerBase
    {
        private readonly ICocktailRepository _cocktailRepository;
        private IUserProfileRepository _userProfileRepository;


        public CocktailController(ICocktailRepository cocktailRepository, IUserProfileRepository userProfileRepository)
        {
            _cocktailRepository = cocktailRepository;
            _userProfileRepository = userProfileRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            return Ok(_cocktailRepository.GetAllCocktails(user.Id));
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, Cocktail cocktail)
        {
            if(id != cocktail.Id)
            {
                return BadRequest();
            }
            _cocktailRepository.UpdateCocktail(cocktail);
            return Ok(cocktail);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
