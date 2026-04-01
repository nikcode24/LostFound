import React, { useState } from "react";

const Found = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    itemName: "",
    location: "",
    dateFound: "",
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
    console.log("Found item submitted:", form);
    alert("Found item reported successfully! Thank you for helping someone.");
    setForm({ name: "", email: "", phone: "", itemName: "", location: "", dateFound: "", description: "", image: null });
  };

  return (
    <div>
      <div
        className="hero-container"
        style={{ backgroundImage: `url('/images/found.png')` }}
      />

      <div className="form-container">
        <h1>Report a Found Item</h1>
        <p>Fill this form to report an item you have found.</p>

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

          <label>Found Item Name:</label>
          <input
            type="text"
            name="itemName"
            placeholder="e.g. Wallet, Phone, Keys"
            value={form.itemName}
            onChange={handleChange}
            required
          />

          <label>Location Found:</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Baneshwor, Kathmandu"
            value={form.location}
            onChange={handleChange}
            required
          />

          <label>Date Found:</label>
          <input
            type="date"
            name="dateFound"
            value={form.dateFound}
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

          <button type="submit" className="submit-btn">Submit Found Item</button>
        </form>
      </div>
    </div>
  );
};

export default Found;
