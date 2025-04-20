using System;

namespace MyApiServer.Dtos;

public class BookingDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Status { get; set; }
    public decimal Amount { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; }
    public int BoothId { get; set; }
    public string BoothName { get; set; }
}
