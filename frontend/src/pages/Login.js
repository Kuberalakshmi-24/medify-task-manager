import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { setLogin } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      dispatch(setLogin({ user: data.user, token: data.token }));
      alert("Login Successful!");
      navigate('/dashboard');
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Medify <span style={{color: '#4318FF'}}>Pro</span></h2>
        <p style={styles.subtitle}>Login to your dashboard</p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            style={styles.input} 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              style={styles.input} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              style={styles.eyeIcon}
            >
              {showPassword ? '👁️' : '🙈'}
            </span>
          </div>
          <button type="submit" style={styles.btn}>Sign In</button>
        </form>
        <p style={{marginTop: '15px', fontSize: '14px', color: '#A3AED0'}}>
          Don't have an account? <span onClick={() => navigate('/register')} style={styles.link}>Register</span>
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

export default Login;