import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact submitted:", form);
    alert("Message sent! We will get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      <div
        className="hero-container"
        style={{ backgroundImage: `url('/images/contact_lost.png')` }}
      />

      <div className="form-container">
        <h1>Contact Us</h1>
        <p>Fill this form to get in touch with us.</p>

        <form onSubmit={handleSubmit} className="report-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <label>Message:</label>
          <textarea
            name="message"
            placeholder="Write your message here..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
