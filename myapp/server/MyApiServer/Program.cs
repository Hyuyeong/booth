using Microsoft.EntityFrameworkCore;
using MyApiServer.Model;

var builder = WebApplication.CreateBuilder(args);

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


// 컨트롤러 등록
builder.Services.AddControllers();

var app = builder.Build();

// CORS 사용
app.UseCors("AllowFrontend");

// 라우팅 및 컨트롤러 사용
app.MapControllers();

app.Run();
