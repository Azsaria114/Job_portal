import React, { useState, useEffect } from 'react';
import './Userprofile.css'; // Make sure to import the CSS file

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    job: '',
    salary: '',
    usertype: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    try {
      const user = localStorage.getItem('user');
      const userJSONString = JSON.parse(user);
      const email = userJSONString.data.email;

      fetch(`http://127.0.0.1:8000/api/adduser/?email=${email}`)
        .then(response => response.json())
        .then(data => {
          setUserData(data.data);
          setFormData({
            name: data.data.name,
            age: data.data.age,
            phone: data.data.phone,
            job: data.data.job,
            salary: data.data.salary,
            usertype: data.data.usertype
          });
        })
        .catch(error => console.error('Error fetching user data:', error));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const userJSONString = JSON.parse(user);
    const email = userJSONString.data.email;

    const updatedData = { ...formData, email, password };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/adduser/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const result = await response.json();
        setUserData(result.data);
        setIsEditing(false);
        setPassword(''); // Clear the password field after update
      } else {
        const errorData = await response.json();
        console.error('Failed to update user details:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleEditClick() {
    const enteredPassword = prompt("Please enter your password to edit your details:");
    if (enteredPassword) {
      setPassword(enteredPassword);
      setIsEditing(true);
    }
  }

  function renderUserDetails() {
    if (userData) {
      return (
        <div>
          <h2>Profile</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Job:</strong> {userData.job}</p>
          <p><strong>Salary:</strong> {userData.salary}</p>
          <p><strong>User Type:</strong> {userData.usertype}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      );
    } else {
      return <p>Loading user data...</p>;
    }
  }

  function renderEditForm() {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Job:</label>
          <input type="text" name="job" value={formData.job} onChange={handleChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
        </div>
        <div>
          <label>User Type:</label>
          <input type="text" name="usertype" value={formData.usertype} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div className="user-profile-container">
      {isEditing ? renderEditForm() : renderUserDetails()}
    </div>
  );
}

export default UserProfile;
