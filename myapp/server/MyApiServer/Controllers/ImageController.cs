using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyApiServer.Model;

[Route("api/[controller]")]
[ApiController]
public class ImageController : ControllerBase
{
    private readonly Cloudinary _cloudinary;

    public ImageController(IOptions<CloudinarySettings> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(account);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file provided.");

        await using var stream = file.OpenReadStream();

        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "Booths"  // 원하는 Cloudinary 폴더명
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            return StatusCode(500, uploadResult.Error.Message);

        // 클라이언트로 URL 전달
        return Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
    }
}


