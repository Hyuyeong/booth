using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApiServer.Model;

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

    [HttpGet("{id}")]
    public async Task<ActionResult<Booth>> GetBoothById(int id)
    {
        var booth = await _context.Booths.FindAsync(id);
        if (booth == null) return NotFound();
        return booth;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooth([FromBody] Booth booth)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Booths.Add(booth);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBoothById), new { id = booth.Id }, booth);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBooth(int id, Booth booth)
    {
        if (id != booth.Id)
        {
            return BadRequest("Booth ID mismatch.");
        }

        var existingBooth = await _context.Booths.FindAsync(id);
        if (existingBooth == null)
        {
            return NotFound("Booth not found.");
        }

        existingBooth.Name = booth.Name;
        existingBooth.Descrpition = booth.Descrpition;
        existingBooth.ImageAddress = booth.ImageAddress;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Booths.Any(e => e.Id == id))
                return NotFound();
            else
                throw;
        }

        return NoContent();  // 업데이트 성공!
    }



}
