import React from "react";

const About = () => {
  return (
    <div>
      <div
        className="hero-container"
        style={{ backgroundImage: `url('/images/lost.png')` }}
      >
        <div className="text-overlay">
          <h1 className="first">Lost it? List it. Let the world help you find it.</h1>
          <h1 className="second">Found something? Post it here and be someone's hero.</h1>
        </div>
      </div>

      <div className="about-mission">
        <h1>Our Mission</h1>
        <p>
          Our mission is to create a reliable and efficient platform for reuniting
          lost items with their rightful owners. We aim to foster a supportive
          community where users can easily report, search, and recover lost belongings,
          enhancing trust and cooperation among individuals. By leveraging technology,
          we strive to reduce the time, effort, and stress associated with finding lost
          items, ensuring a seamless and satisfying experience for all our users.
        </p>
      </div>
    </div>
  );
};

export default About;
