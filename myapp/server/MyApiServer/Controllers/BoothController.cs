using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BoothController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BoothController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var data = _context.Booths.ToList();
        return Ok(data);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBooth(int id)
    {
        var booth = _context.Booths.Find(id);
        if (booth == null) return NotFound();

        _context.Booths.Remove(booth);
        _context.SaveChanges();

        return NoContent();
    }
}
