using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private IIngredientRepository _ingredientRepository;
        private IIngredientTypeRepository _ingredientTypeRepository;
        private IUserProfileRepository _userProfileRepository;

        public IngredientController(IIngredientRepository ingredientRepository,
                                    IIngredientTypeRepository ingredientTypeRepository,
                                    IUserProfileRepository userProfileRepositor)
        {
            _ingredientRepository = ingredientRepository;
            _ingredientTypeRepository = ingredientTypeRepository;
            _userProfileRepository = userProfileRepositor;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            return Ok(_ingredientRepository.GetAllIngredients(user.Id));
        }

        [HttpPost]
        public IActionResult AddIngredient(Ingredient ingredient)
        {
            _ingredientRepository.AddIngredient(ingredient);
            return CreatedAtAction("Get", new { id = ingredient.Id }, ingredient);
        }

        [HttpPost("AddUserIngredient/{id}")]
        public IActionResult AddUserIngredient(int id)
        {
            var user = GetCurrentUserProfile();
            _ingredientRepository.AddUserIngredient(id, user.Id);
            return Ok();
        }

        [HttpDelete("DeleteUserIngredient/{id}")]
        public IActionResult DeleteUserIngredient(int id)
        {
            var user = GetCurrentUserProfile();
            _ingredientRepository.DeleteUserIngredient(id, user.Id);
            return Ok();
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
            var user = GetCurrentUserProfile();
            var ingredient = _ingredientRepository.GetIngredientById(id, user.Id);
            if (ingredient == null)
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

        [HttpGet("GetIngredientByType/{id}")]
        public IActionResult GetAllIngredientByType(int id)
        {
            var user = GetCurrentUserProfile();
            return Ok(_ingredientRepository.GetIngredientsByType(id, user.Id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (firebaseUserId != null)
            {
                var user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
