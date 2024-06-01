import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './JobDet.css';
import profile from './profile.jpg';
function JobDetails() {
  const [jobDetails, setJobDetails] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [selectedJob, setSelectedJob] = useState('');
  const [availableJobs, setAvailableJobs] = useState([
    'Azure Cloud Engineer',
    'Data Scientist',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer'
  ]);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  async function fetchJobDetails() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/jobdetail/');
      if (response.ok) {
        const data = await response.json();
        setJobDetails(data.data);
      } else {
        console.error('Failed to fetch job details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchSearchResult(jobName) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search/?job_name=${jobName}`);

      if (response.ok) {
        const data = await response.json();
        setSearchResult(data.data[0]);
      } else {
        console.error('Failed to fetch search result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleSearchChange(event) {
    const jobName = event.target.value;
    setSelectedJob(jobName);
    fetchSearchResult(jobName);
  }

  function handleApplyClick(job) {
    setSelectedJob(job);
    const user = localStorage.getItem('user');
    if (!user) {
      window.alert('User not found. Please log in.');
      return;
    }
  
    const userJSONString = JSON.parse(user);
    const email_id = userJSONString.data.email;
    const email_body=`Dear Hiring Manager,\n\nI am interested in the ${job.job_name} position at ${job.comp_name}.\n\nMy email is: ${email_id}\n\nThank you for considering my application.\n\nBest regards,`
    const emailData = {
      to_email: job.email_id,
      email_subject: "Application for the job",
      email_body:email_body
    };
  
    async function sendEmail() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/email/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          window.alert('Email sent successfully');
        } else {
          console.error('Failed to send email');
          window.alert('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
        window.alert('An error occurred while sending the email');
      }
    }
  
    sendEmail();
  
    console.log('Selected job details:', emailData);
  }
  

  return (
    <div>
      <div className="profile-section">
        <Link to="/userprofile">
          <img src={profile} alt="Profile" />
        </Link>
      </div>

      <h2>Find Your Dream Job</h2>

      

      {/* Search job details */}
      <div className="search-section">
      
        <h3>Search</h3>
        <select value={selectedJob} onChange={handleSearchChange}>
          <option value="">Select a job</option>
          {availableJobs.map((job, index) => (
            <option key={index} value={job}>{job}</option>
          ))}
        </select>
      </div>

      {/* Display search result */}
      {searchResult && (
        <div className="job-card">
         <h3>Search Result</h3>
  {searchResult ? (
    <>
      <p><strong>Message:</strong> {searchResult.message}</p>
      <p><strong>Company Name:</strong> {searchResult.comp_name}</p>
      <p><strong>Job Name:</strong> {searchResult.job_name}</p>
      <p><strong>Role:</strong> {searchResult.role}</p>
      <p><strong>Experience:</strong> {searchResult.experience}</p>
      <p><strong>Salary Range:</strong> {searchResult.salary_ran}</p>
      <p><strong>Location:</strong> {searchResult.location}</p>
      <p><strong>Job Description:</strong> {searchResult.job_des}</p>
      <p><strong>Notice Period:</strong> {searchResult.notice_period}</p>
      <p><strong>Job Type:</strong> {searchResult.job_type}</p>
      <p><strong>Qualification:</strong> {searchResult.qualification}</p>
      <button onClick={() => handleApplyClick(searchResult)}>Apply</button>
    </>
  ) : (
    <p>Job not available</p>
  )}
      </div>
      )}

      {/* Display job details as cards */}
      <div className="job-cards-container">
        {jobDetails.length > 0 ? (
          jobDetails.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.job_name}</h3>
              <p><strong>Message:</strong> {job.message}</p>
              <p><strong>Company Name:</strong> {job.comp_name}</p>
              <p><strong>Role:</strong> {job.role}</p>
              <p><strong>Experience:</strong> {job.experience}</p>
              <p><strong>Salary Range:</strong> {job.salary_ran}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Job Description:</strong> {job.job_des}</p>
              <p><strong>Notice Period:</strong> {job.notice_period}</p>
              <p><strong>Job Type:</strong> {job.job_type}</p>
              <p><strong>Qualification:</strong> {job.qualification}</p>
              <button onClick={() => handleApplyClick(job)}>Apply</button>
            </div>
          ))
        ) : (
          <p>No job details available</p>
        )}
      </div>
    </div>
  );
}

export default JobDetails;