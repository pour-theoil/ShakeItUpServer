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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientTypeController : ControllerBase
    {
        private IIngredientTypeRepository _ingredientTypeRepository;

        public IngredientTypeController(IIngredientTypeRepository ingredientTypeRepository)
        {
            _ingredientTypeRepository = ingredientTypeRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_ingredientTypeRepository.GetIngredientTypes());
        }
    }
}
