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


        [HttpGet("get_contacts")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            // Retrieve all contacts from the database
            var contacts = await _context.Contacts.ToListAsync();

            // Check if any contacts were found
            if (contacts == null || !contacts.Any())
            {
                return NotFound("No contacts found.");
            }

            return Ok(contacts);
        }

        [HttpGet("get_contact/{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            // Find the contact by ID
            var contact = await _context.Contacts.FindAsync(id);

            // Check if the contact exists
            if (contact == null)
            {
                return NotFound($"Contact with ID {id} not found.");
            }

            // Return the contact
            return Ok(contact);
        }
        
        [HttpPut("update_contact/{id}")]
        public async Task<ActionResult<Contact>> UpdateContact(int id, Contact updatedContact)
        {
            // Check if the provided contact ID matches an existing contacts
            var existingContact = await _context.Contacts.FindAsync(id);
            if (existingContact == null)
            {
                return NotFound($"Contact with ID {id} not found.");
            }

            // Check if the updated email address already exists when updating
            if (await _context.Contacts.AnyAsync(c => c.EmailAddress == updatedContact.EmailAddress && c.Id != id))
            {
                return Conflict("A contact with the same email address already exists.");
            }

            // Convert DateOfBirth to UTC format
            updatedContact.DateOfBirth = updatedContact.DateOfBirth.ToUniversalTime();

            // Update the existing contact properties
            existingContact.Name = updatedContact.Name;
            existingContact.Surname = updatedContact.Surname;
            existingContact.TelephoneNumber = updatedContact.TelephoneNumber;
            existingContact.EmailAddress = updatedContact.EmailAddress;
            existingContact.DateOfBirth = updatedContact.DateOfBirth;

            // Save the changes to the database
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contact updated successfully", contact = existingContact });
        }

        [HttpDelete("delete_contact/{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            // Check if the provided contact ID matches an existing contacts
            var existingContact = await _context.Contacts.FindAsync(id);
            if (existingContact == null)
            {
                return NotFound($"Contact with ID {id} not found.");
            }

            // Remove the contact from the database
            _context.Contacts.Remove(existingContact);
            await _context.SaveChangesAsync();

            return Ok("Contact deleted successfully");
        }



    }
}
