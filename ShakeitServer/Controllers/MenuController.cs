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
    public class MenuController : ControllerBase
    {
        private IMenuRepository _menuRepository;
        private IUserProfileRepository _userProfileRepository;
        private ISeasonRepository _seasonRepository;

        public MenuController(  IMenuRepository menuRepository, 
                                IUserProfileRepository userProfileRepository,
                                ISeasonRepository seasonRepository)
        {
            _seasonRepository = seasonRepository;
            _menuRepository = menuRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var firebaseUserProfile = GetCurrentUserProfile();
            return Ok(_menuRepository.GetAllMenus(firebaseUserProfile.Id));
        }

        [HttpPost]
        public IActionResult AddMenu(Menu menu)
        {
            var firebaseUserProfile = GetCurrentUserProfile();
            menu.UserProfileId = firebaseUserProfile.Id;
            _menuRepository.AddMenu(menu);
            return CreatedAtAction("Get", new { id = menu.Id }, menu);
        }

        [HttpGet("seasons")]
        public IActionResult GetSeasons()
        {
            return Ok(_seasonRepository.GetSeasons());
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuRepository.DeleteMenu(id);
            return NoContent();
        }

        [HttpDelete("removecocktail/{menuId}/{cocktailId}")]
        public IActionResult RemoveCocktailFromMenu(int menuId, int cocktailId)
        {
            _menuRepository.RemoveCocktailFromMenu(menuId, cocktailId);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var firebaseUserProfile = GetCurrentUserProfile();
            var menu = _menuRepository.GetMenuById(id, firebaseUserProfile.Id);
            if(menu == null)
            {
                return NotFound();
            }
            return Ok(menu);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Menu menu)
        {
            if (id != menu.Id)
            {
                return BadRequest();
            }

            _menuRepository.UpdateMenu(menu);
            return Ok(menu);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
