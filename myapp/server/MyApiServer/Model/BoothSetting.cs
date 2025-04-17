using System;

namespace MyApiServer.Model;

public class BoothSetting
{
    public int Id { get; set; }
    public string BoothName { get; set; }
    public int MaxPeople { get; set; }
    public bool IsActive { get; set; }
    public string Note { get; set; }
}
