import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    profilePictureUrl: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // ✅ Warn user if the ProfilePictureUrl is invalid
    if (form.profilePictureUrl && !isValidUrl(form.profilePictureUrl)) {
      alert("The Profile Picture URL is invalid. A default image will be used.");
    }

    // ✅ Use default placeholder if invalid or empty
    const profileUrl = isValidUrl(form.profilePictureUrl)
      ? form.profilePictureUrl
      : "https://via.placeholder.com/150";

    const formData = {
      ...form,
      profilePictureUrl: profileUrl,
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data;

      if (response.ok) {
        try {
          data = await response.json();
          setMessage(data.message || "Registration successful!");
        } catch (jsonError) {
          throw new Error("Server returned a non-JSON response.");
        }
      } else {
        try {
          data = await response.json();
          setError(data.message || JSON.stringify(data.errors));
        } catch {
          const text = await response.text();
          setError(`Server error: ${text}`);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="profilePictureUrl"
          placeholder="Profile Picture URL"
          value={form.profilePictureUrl}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
