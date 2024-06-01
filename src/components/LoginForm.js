// LoginForm.js
import React, { useState } from 'react';
import './Loginform.css';
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          const responseData = await response.json();  // Extract JSON data from the response
          console.log('Form submitted successfully:', responseData);
          
          // Store user details in local storage upon successful login
          localStorage.setItem('user', JSON.stringify(responseData));
         
          // Redirect based on usertype
          if (responseData.data.usertype === 0) {
              // Redirect to normal user page
              window.location.href = 'http://192.168.56.1:3000/jobdetails';
          } else if (responseData.data.usertype === 1) {
              // Redirect to admin user page
              window.location.href = 'http://192.168.56.1:3000/jobform';
          } else {
              console.error('Unknown usertype:', responseData.usertype);
          }
          window.alert('login successfull');
      } else {
          const errorData = await response.json();
          console.error('Form submission failed:', errorData);  // Log detailed error information
      }
  } catch (error) {
      console.error('An error occurred while submitting the form:', error);
  }

    // Your submit logic here
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <a href="/userpage">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginForm;
