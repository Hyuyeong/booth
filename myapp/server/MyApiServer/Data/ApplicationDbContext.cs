using Microsoft.EntityFrameworkCore;
using MyApiServer.Model;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Booth> Booths { get; set; }
    public DbSet<BoothSetting> BoothSettings { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<PlayType> PlayType { get; set; }
}
