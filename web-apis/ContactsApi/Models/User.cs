using System;
using System.ComponentModel.DataAnnotations;

namespace ContactsApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string EmailAddress { get; set; }
        public required string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Role { get; internal set; }
    }

    public class CreateUserDto
    {
        public required string Username { get; set; }

        [EmailAddress]
        public required string EmailAddress { get; set; }

        // Plaintext password (not stored)
        [MinLength(6)]
        public required string Password { get; set; }
        public required string Role { get; set; }
    }

    public class LoginDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

}
