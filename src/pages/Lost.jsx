import React, { useState } from "react";

const Lost = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    itemName: "",
    location: "",
    dateLost: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lost item submitted:", form);
    alert("Lost item reported! We hope you find it soon.");
    setForm({ name: "", email: "", phone: "", itemName: "", location: "", dateLost: "", description: "", image: null });
  };

  return (
    <div>
      <div
        className="hero-container"
        style={{ backgroundImage: `url('/images/lost2.png')` }}
      />

      <div className="form-container">
        <h1>Report a Lost Item</h1>
        <p>Fill this form to report an item you have lost.</p>

        <form onSubmit={handleSubmit} className="report-form">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
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

          <label>Contact Number:</label>
          <input
            type="tel"
            name="phone"
            placeholder="98XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label>Lost Item Name:</label>
          <input
            type="text"
            name="itemName"
            placeholder="e.g. Wallet, Phone, Keys"
            value={form.itemName}
            onChange={handleChange}
            required
          />

          <label>Location Lost:</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Ratnapark, Kathmandu"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label>Date Lost:</label>
          <input
            type="date"
            name="dateLost"
            value={form.dateLost}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Describe the item in detail..."
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          />

          <label>Upload Item Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">Submit Lost Item</button>
        </form>
      </div>
    </div>
  );
};

export default Lost;
