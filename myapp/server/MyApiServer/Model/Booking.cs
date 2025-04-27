using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApiServer.Model;

public class Booking
{
    [Key]
    public int Id { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public int Duration { get; set; } // Duration in hours


    [Required]
    [StringLength(20)]
    public string Status { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Amount { get; set; }


    [Required]
    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public virtual User User { get; set; }


    [Required]
    public int BoothId { get; set; }
    [ForeignKey("BoothId")]
    public virtual Booth Booth { get; set; }


    [Required]
    public int PlayTypeId { get; set; }
    [ForeignKey("PlayTypeId")]
    public virtual PlayType PlayType { get; set; }

}
