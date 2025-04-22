using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyApiServer.Model;

var builder = WebApplication.CreateBuilder(args);

// 설정값 가져오기
var secretKey = builder.Configuration["JwtSettings:Secret"];
var key = Encoding.ASCII.GetBytes(secretKey);
// CORS 설정
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")  // 프론트 URL
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
{
    var connectionString =
        Environment.GetEnvironmentVariable("DATABASE_URL")
        ?? builder.Configuration.GetConnectionString("MySqlConnection");
    opt.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection("CloudinarySettings")
);
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();


// JWT 인증 설정
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});


// 컨트롤러 등록
builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
// CORS 사용
app.UseCors("AllowFrontend");

// 라우팅 및 컨트롤러 사용
app.MapControllers();

app.Run();
