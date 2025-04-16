using Microsoft.EntityFrameworkCore;
using MyApiServer.Model;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Booth> Booths { get; set; }
}
