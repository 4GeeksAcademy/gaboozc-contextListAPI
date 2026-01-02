// Edit flow: read id from URL, fetch existing record, bind fields to state, PUT on submit.
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditContact = () => {

  const { id } = useParams();

  // Initialize state to store the contact data being edited
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  // Fetch contact data when component loads or when `id` changes
  useEffect(() => {
    const fetchContact = async () => {
      try {
        // Send GET request to fetch a single contact by ID
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/gaboozc/contacts/${id}`);
        if (response.ok) {
          const data = await response.json(); // Parse response as JSON
          setContact(data); // Populate form fields with fetched data
        } else {
          console.error('Failed to fetch contact'); // Log if fetch fails
        }
      } catch (error) {
        console.error('Error fetching contact:', error); // Log network or server errors
      }
    };

    fetchContact(); // Call the function immediately
  }, [id]); // Dependency ensures it runs again if `id` changes

  // Update state whenever a form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target; // Destructure input name and its current value
    setContact({ ...contact, [name]: value }); // Update only the changed field
  };

  // Handle form submission to update contact
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    try {
      // Send PUT request to update contact by ID
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/gaboozc/contacts/${id}`, {
        method: 'PUT', // HTTP method for updating data
        headers: {
          'Content-Type': 'application/json', // Tell server we're sending JSON
        },
        body: JSON.stringify(contact), // Send updated data as JSON
      });

      if (response.ok) {
        const data = await response.json(); // Parse response
        console.log('Contact updated successfully:', data); // Log success
      } else {
        console.error('Failed to update contact'); // Log failure
      }
    } catch (error) {
      console.error('Error updating contact:', error); // Log network or server errors
    }
  };

  // Inline styles for the container
  const elementStyle = {
    backgroundColor: '#ffffff',
    border: '2px solid #000000',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: 'auto'
  };

  // Style for the title
  const h1Style = {
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif',
    color: '#333333',
    textAlign: 'center',
    marginBottom: '20px'
  };

  // Style for form labels
  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  // Style for inputs
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  };

  // Style for submit button
  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  // Style for the bottom link
  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '20px',
    color: '#007bff',
    textDecoration: 'none'
  };

  // JSX returned by the component
  return (
    <div style={elementStyle}>
      <h1 style={h1Style}>Edit Contact</h1> {/* Page title */}
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        
        {/* Full Name Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={contact.name} // Bind input to state
            placeholder="Enter full name"
            onChange={handleInputChange} // Update on change
            style={inputStyle}
          />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            placeholder="Enter email"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        {/* Phone Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            placeholder="Enter phone number"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        {/* Address Field */}
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Address</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            placeholder="Enter address"
            onChange={handleInputChange}
            style={inputStyle}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={buttonStyle}>Save</button>
      </form>

      {/* Navigation link (no real routing here yet) */}
      <a href="#" style={linkStyle}>or get back to contacts</a>
    </div>
  );
};

// Export component for usage in other files
export default EditContact;
