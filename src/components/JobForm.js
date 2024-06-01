import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from './profile.jpg'; // Ensure this path is correct
import './adminform.css'; // Import the CSS file

function JobForm() {
  const [formData, setFormData] = useState({
    message: '',
    comp_name: '',
    job_name: '',
    role: '',
    experience: '',
    salary_ran: '',
    location: '',
    job_des: '',
    notice_period: '',
    job_type: '',
    qualification: '',
    email_id: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const user = localStorage.getItem('user');
  const userJSONString = JSON.parse(user);
  const email_id = userJSONString.data.email;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/jobdetail/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data); 
        console.log(formData);
        window.alert("Job Posted Successfully");
      } else {
        console.error('Failed to submit:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div className="profile-section">
        <Link to="/userprofile">
          <img src={profile} alt="Profile" />
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Message:</label>
          <input type="text" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <div>
          <label>Company Name:</label>
          <input type="text" name="comp_name" value={formData.comp_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Name:</label>
          <input type="text" name="job_name" value={formData.job_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} required />
        </div>
        <div>
          <label>Experience:</label>
          <input type="text" name="experience" value={formData.experience} onChange={handleChange} required />
        </div>
        <div>
          <label>Salary Range:</label>
          <input type="text" name="salary_ran" value={formData.salary_ran} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea name="job_des" value={formData.job_des} onChange={handleChange} required />
        </div>
        <div>
          <label>Notice Period:</label>
          <input type="text" name="notice_period" value={formData.notice_period} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Type:</label>
          <input type="text" name="job_type" value={formData.job_type} onChange={handleChange} required />
        </div>
        <div>
          <label>Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email_id" value={formData.email_id = email_id} onChange={handleChange} required readOnly />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobForm;
