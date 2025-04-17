using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApiServer.Model;

namespace MyApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoothSettingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BoothSettingController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<BoothSetting>> Get(int id)
        {
            var setting = await _context.BoothSettings.FindAsync(id);
            if (setting == null) return NotFound();
            return setting;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BoothSetting setting)
        {
            if (id != setting.Id) return BadRequest();

            _context.Entry(setting).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
