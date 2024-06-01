// src/UserForm.js

import React, { useState } from 'react';
import './signup.css'; // Import the CSS file

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    age: '',
    email: '',
    phone: '',
    job: '',
    salary: '',
    usertype: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/adduser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.alert('Form submitted successfully');
      window.location.href = 'http://192.168.56.1:3000/loginform';
    } else {
      console.error('Form submission failed');
    }
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Job:</label>
        <input type="text" name="job" value={formData.job} onChange={handleChange} required />
      </div>
      <div>
        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
      </div>
      <div>
        <label>User Type:</label>
        <input type="number" name="usertype" value={formData.usertype} onChange={handleChange} placeholder='0-JobSeeker,1-Job Poster' required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
