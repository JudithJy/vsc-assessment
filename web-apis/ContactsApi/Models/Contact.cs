using System;
using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        [Required]
        public required string Surname { get; set; }

        [Required]
        public long TelephoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
