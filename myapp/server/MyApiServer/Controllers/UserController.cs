// using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "Admin")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        // [HttpGet("admin-only")]
        [HttpGet]
        public IActionResult Get(int page = 1, int pageSize = 2)
        {
            var totalCount = _context.Users.Count();
            var items = _context.Users
                       .Skip((page - 1) * pageSize)
                       .Take(pageSize)
                       .ToList();

            var data = new
            {
                items = items,
                totalCount = totalCount
            };
            return Ok(data);
        }


    }
}
