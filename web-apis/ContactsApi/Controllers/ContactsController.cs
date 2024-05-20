using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ContactsApi.Data;
using ContactsApi.Models;

namespace ContactsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly ContactContext _context;

        public ContactsController(ContactContext context)
        {
            _context = context;
        }

        [HttpPost("create_contact")]
        public async Task<ActionResult<Contact>> CreateContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if a contact with the same email address already exists
            var existingContact = await _context.Contacts.FirstOrDefaultAsync(c => c.EmailAddress == contact.EmailAddress);
            if (existingContact != null)
            {
                return Conflict("A contact with the same email address already exists.");
            }

            // Ensure that DateOfBirth is in UTC format
            if (contact.DateOfBirth.Kind != DateTimeKind.Utc)
            {
                contact.DateOfBirth = contact.DateOfBirth.ToUniversalTime();
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            // Return a success message along with the created contact
            return Ok(new { message = "Contact created successfully", contact });
        }


    }
}
