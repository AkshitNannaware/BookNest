import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling errors

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting message:', form);
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      // Sending data to the backend
      const response = await fetch(`http://localhost:5000/api/contact/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, show success alert
        alert('Message sent! We’ll get back to you shortly.');
        setForm({ name: '', email: '', message: '' });
      } else {
        // If something went wrong, show error
        setError(data.error || 'Something went wrong!');
      }
    } catch (err) {
      setError('Network error, please try again later!');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contactpage">Contact Us</h2>
      <p className="contact-subtitle">
        Have questions or need help? Drop us a message!
      </p>

      {/* Show loading spinner if in loading state */}
      {loading && <p className="loading-text">Sending...</p>}
      
      {/* Show error message if there's any */}
      {error && <p className="error-text">{error}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={loading}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;