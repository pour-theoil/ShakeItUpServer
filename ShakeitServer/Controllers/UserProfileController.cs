using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ShakeitServer.Repositories;
using ShakeitServer.Models;

namespace ShakeitServer.Controllers

{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IIngredientRepository _ingredientRepository;
        private readonly ICocktailRepository _cocktailRepository;
        private readonly IMenuRepository _menuRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository,
                                     IIngredientRepository ingredientRepository,
                                     ICocktailRepository cocktailRepository,
                                     IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
            _cocktailRepository = cocktailRepository;
            _userProfileRepository = userProfileRepository;
            _ingredientRepository = ingredientRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            userProfile.UserTypeId = UserType.USER_TYPE_ID;
            _userProfileRepository.Add(userProfile);

            //Build ingredient Pantry with current ingredients
            var ingredients = _ingredientRepository.GetAllDataBaseIngredients();
            
            //Add Sample Cocktails and menu
            _ingredientRepository.BuildNewUserIngredients(ingredients, userProfile.Id);
            var cocktails = _cocktailRepository.GetSeedCocktails(11);
            
            //Build Test Menu
            var menu = _menuRepository.GetMenuById(5, 11);
            menu.UserProfileId = userProfile.Id;
            _menuRepository.AddMenu(menu);

            cocktails.ForEach(cocktail =>
            {
                cocktail.UserProfileId = userProfile.Id;
                cocktail.MenuId = menu.Id;
                _cocktailRepository.AddCocktail(cocktail);
                _cocktailRepository.UpdateCocktail(cocktail);
                
            });

            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }
    }
}
