import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!form.fullName.trim()) {
      setError('Full Name is required.');
      return;
    }

    // Optional: simple frontend validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
          profilePictureUrl: form.profilePictureUrl,
        }),
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);

        if (response.ok) {
          setMessage(data.message || "Registration successful!");
        } else {
          setError(data.message || "Registration failed.");
        }
      } catch {
        setError(`Server returned non-JSON error: ${text}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
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
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
