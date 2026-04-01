import React from "react";
import { FaCalendar} from "react-icons/fa";

const Gallery = () => {
  return <div>
    <div
      className="hero-container"
      style={{ backgroundImage: `url('/images/contact_lost.png')` }}
    ></div>
    <div className="gallery">
      <h1>Lost Item</h1>
      <div className="gallery-grid">
        <div className="card">
          <img src="/images/passport.png" alt="wallet" />
          <div className="card-body">
            <p>Item Name: Passport</p>
            <p>Location: Ratnapark, Kathmandu</p>
            <p><FaCalendar /> 7/2/2024</p>
            <p className="lost">Lost Passport</p>
          </div>
        </div>
        <div className="card">
          <img src="/images/ring.png" alt="bag" />
          <div className="card-body">
            <p>Item Name: Bag</p>
            <p>Location: Hetauda</p>
            <p><FaCalendar /> 5/18/2024</p>
            <p className="lost">Lost Ring</p>
          </div>
        </div>
    
        <div className="card">
          <img src="/images/atm_card.png" alt="phone" />
          <div className="card-body">
            <p>Item Name: ATM Card</p>
            <p>Location: Bhanu chowk, Janakpur</p>
            <p><FaCalendar /> 6/24/2024</p>
            <p className="lost">Lost ATM Card</p>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div className="gallery">
      <h1>Found Item</h1>
      <div className="gallery-grid">
        <div className="card">
          <img src="/images/passport.png" alt="wallet" />
          <div className="card-body">
            <p>Item Name: Passport</p>
            <p>Location: Ratnapark, Kathmandu</p>
            <p><FaCalendar /> 7/2/2024</p>
            <p className="found">Found Passport</p>
          </div>
        </div>
        <div className="card">
          <img src="/images/ring.png" alt="bag" />
          <div className="card-body">
            <p>Item Name: Bag</p>
            <p>Location: Hetauda</p>
            <p><FaCalendar /> 5/18/2024</p>
            <p className="found">Found Ring</p>
          </div>
        </div>
    
        <div className="card">
          <img src="/images/atm_card.png" alt="phone" />
          <div className="card-body">
            <p>Item Name: ATM Card</p>
            <p>Location: Bhanu chowk, Janakpur</p>
            <p><FaCalendar /> 6/24/2024</p>
            <p className="found">Found ATM Card</p>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
};

export default Gallery;