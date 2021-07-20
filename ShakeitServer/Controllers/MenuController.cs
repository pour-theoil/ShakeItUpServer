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
    public class MenuController : ControllerBase
    {
        private IMenuRepository _menuRepository;

        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_menuRepository.GetAllMenus());
        }

        [HttpPost]
        public IActionResult AddMenu(Menu menu)
        {
            _menuRepository.AddMenu(menu);
            return CreatedAtAction("Get", new { id = menu.Id }, menu);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _menuRepository.DeleteMenu(id);
            return NoContent();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var menu = _menuRepository.GetMenuById(id);
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
    }
}
