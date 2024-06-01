import React, { useState, useEffect } from 'react';
import './Welcomepage.css';
import welcomeImage from './welcomeimg.jpg'; // Import your welcome image

function Welcome() {
  const [portalName, setPortalName] = useState("C^2");

 

    const interval = setInterval(() => {
      setPortalName((prevName) => (prevName === "C^2" ? "Career Connect" : "C^2"));
    }, 400);
    useEffect(() => {
      const timeout = setTimeout(() => {
        setPortalName("Career Connect");
      }, 5000);
  
  

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://192.168.56.1:3000/loginform';
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="portal-name">{portalName}</div>
        <button className="login-button" onClick={handleLogin}>Login</button>
      </header>
      <main className="welcome-main">
        <div className="welcome-content">
          <div className="welcome-text">
            <p>
              Welcome to our job portal! Whether you're searching for your dream job, exploring career options, or seeking guidance, we're here to assist you.
            </p>
            <p>
              Our platform connects job seekers with leading employers across various industries. With a diverse range of job listings, company profiles, and resources, we empower you to make informed career decisions.
            </p>
          </div>
          <div className="welcome-image">
            <img src={welcomeImage} alt="Welcome Image" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Welcome;
