using System;

namespace MyApiServer.Model;

public class PlayType
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Descrpition { get; set; }
    public decimal Price { get; set; }
    public decimal HappyHourPrice { get; set; }

}
