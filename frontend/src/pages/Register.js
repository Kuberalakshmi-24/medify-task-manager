import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false); // Eye icon logic
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      alert("Registration Failed! Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Medify <span style={{color: '#4318FF'}}>Pro</span></h2>
        <p style={styles.subtitle}>Create your account</p>
        <form onSubmit={handleRegister}>
          <input 
            style={styles.input} 
            placeholder="Full Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            style={styles.input} 
            placeholder="Email Address" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              style={styles.input} 
              placeholder="Password" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
            {/* Password Eye Icon */}
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeIcon}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          <button type="submit" style={styles.btn}>Sign Up</button>
        </form>
        <p style={{marginTop: '15px', fontSize: '14px', color: '#A3AED0'}}>
          Already have an account? <span onClick={() => navigate('/login')} style={styles.link}>Login</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F7FE' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0px 10px 30px rgba(0,0,0,0.05)', width: '350px', textAlign: 'center' },
  title: { fontSize: '24px', fontWeight: '700', marginBottom: '10px' },
  subtitle: { color: '#A3AED0', marginBottom: '25px', fontSize: '14px' },
  input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E0E5F2', marginBottom: '15px', outline: 'none', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#4318FF', color: '#fff', fontWeight: '600', cursor: 'pointer' },
  eyeIcon: { position: 'absolute', right: '15px', top: '12px', cursor: 'pointer', fontSize: '16px' },
  link: { color: '#4318FF', cursor: 'pointer', fontWeight: 'bold' }
};

export default Register;