import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import StatsTable from "../components/StatsTable";

const galleryItems = [
  { name: "Wallet",   location: "Baneshwor, Kathmandu",   date: "7/20/2024", status: "lost",  image: "/images/wallet.png"   },
  { name: "Bag",      location: "Thapathali, Kathmandu",  date: "7/20/2024", status: "found", image: "/images/bag.png"      },
  { name: "iPhone",   location: "Santinagar, Kathmandu",  date: "7/20/2024", status: "lost",  image: "/images/iphone.png"   },
  { name: "Passport", location: "Ratnapark, Kathmandu",   date: "7/2/2024",  status: "lost",  image: "/images/passport.png" },
  { name: "Ring",     location: "Hetauda",                date: "5/18/2024", status: "lost",  image: "/images/ring.png"     },
  { name: "ATM Card", location: "Bhanu chowk, Janakpur",  date: "6/24/2024", status: "found", image: "/images/atm_card.png" },
];

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Nepal");

  const handleSearch = () => {
    console.log("Search:", keyword, location);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-container"
        style={{ backgroundImage: `url('/images/h1.png')` }}
      >
        <div className="hero-overlay">
          <h1>Lost Something? We'll Help You Find It.</h1>
          <h2>Found Something? Make Someone's Day.</h2>
          <SearchBar
            keyword={keyword}
            setKeyword={setKeyword}
            location={location}
            setLocation={setLocation}
            onSearch={handleSearch}
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="body-container">
        <h2>Lost It? Found It? Share It Here.</h2>
        <p>Here, we help people unite them with their valuable lost items.</p>
        <div className="action-buttons">
          <Link to="/found"><button className="found-button">I've Found an Item</button></Link>
          <Link to="/lost"><button className="lost-button">I've Lost an Item</button></Link>
        </div>
      </div>

      {/* About Section */}
      <div className="about">
        <div className="about-text">
          <h2>LostFound</h2>
          <p>
            Lostfound.com is an online platform dedicated to helping people
            recover lost items and reunite found belongings with their rightful
            owners. Whether you've misplaced something valuable or found
            something, we make it easy to connect with your community.
          </p>
        </div>
        <div className="about-image">
          <img src="/images/lostfound.png" alt="lostfound" />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery">
        <h2>Lost and Found Item Gallery</h2>
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <ItemCard
              key={index}
              name={item.name}
              location={item.location}
              date={item.date}
              status={item.status}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="works">
        <h1>How it Works</h1>
        <div className="work-item">
          <div className="icon">
            <FaSearchLocation className="search-location" />
            <h2>Lost Items?</h2>
            <p>
              When you lose something, simply report it on our website to
              increase your chances of getting it back.
            </p>
          </div>
          <div className="icon-first">
            <img src="/images/lostbag.png" alt="Lost bag illustration" />
            <h2>Found Items?</h2>
            <p>
              When you find something you know is lost, you can easily post it
              on our website to help reunite it with its owner.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsTable lost={100} helped={100} />
      <br />
    </div>
  );
};

export default Home;
