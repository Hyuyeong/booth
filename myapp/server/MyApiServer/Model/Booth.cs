using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApiServer.Model;

public class Booth
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? ImageAddress { get; set; }
    public string? Descrpition { get; set; }
    public decimal Price { get; set; }
    public decimal HappyHourPrice { get; set; }




}
