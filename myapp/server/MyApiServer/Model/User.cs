using System;

namespace MyApiServer.Model;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; }

    public string EmailAddress { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } = "User";

}
