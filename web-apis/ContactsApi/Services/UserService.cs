using ContactsApi.Data;
using ContactsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Services
{
    public interface IUserService
    {
        Task<User> CreateUser(CreateUserDto userDto);
        Task<User?> Login(string username, string password);
    }

    public class UserService : IUserService
    {
        private readonly ContactContext _context;
        public UserService(ContactContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(CreateUserDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                EmailAddress = userDto.EmailAddress,
                PasswordHash = HashPassword(userDto.Password),
                CreatedAt = DateTime.UtcNow,
                Role = "ADMIN"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User?> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null || !VerifyPassword(password, user.PasswordHash))
            {
                return null;
            }

            return user;
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
