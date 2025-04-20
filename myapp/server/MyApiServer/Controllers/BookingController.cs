using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApiServer.Dtos;

namespace MyApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings()
        {
            var bookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.Booth)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    Date = b.Date,
                    Status = b.Status,
                    Amount = b.Amount,
                    UserId = b.User.Id,
                    UserName = b.User.UserName,
                    BoothId = b.Booth.Id,
                    BoothName = b.Booth.Name
                })
                .ToListAsync();

            return Ok(bookings);
        }





    }
}
