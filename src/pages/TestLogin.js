import React, { useState } from 'react';

function TestLogin() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      console.log('Testing API connection to:', 'http://localhost:5001/api/auth/login');
      
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@localaid.org',
          password: 'admin123'
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setResult(`✅ Login successful! Token received: ${data.token.substring(0, 20)}...`);
      } else {
        setResult(`❌ Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setResult(`❌ Network error: ${error.message}`);
    }
    
    setLoading(false);
  };

  const testWithProxy = async () => {
    setLoading(true);
    setResult('Testing with proxy...');
    
    try {
      console.log('Testing API connection via proxy:', '/api/auth/login');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@localaid.org',
          password: 'admin123'
        }),
      });

      console.log('Proxy response status:', response.status);
      const data = await response.json();
      console.log('Proxy response data:', data);

      if (response.ok) {
        setResult(`✅ Proxy login successful! Token received: ${data.token.substring(0, 20)}...`);
      } else {
        setResult(`❌ Proxy login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Proxy login error:', error);
      setResult(`❌ Proxy network error: ${error.message}`);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🔧 Login Debug Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testLogin} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#4db6ac',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Test Direct API Login
        </button>
        
        <button 
          onClick={testWithProxy} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Test Proxy Login
        </button>
      </div>

      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        minHeight: '100px',
        fontFamily: 'monospace'
      }}>
        <strong>Result:</strong><br />
        {result || 'Click a button to test the login functionality'}
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Test Credentials:</strong></p>
        <p>Email: admin@localaid.org</p>
        <p>Password: admin123</p>
        <p>Open browser console (F12) to see detailed logs.</p>
      </div>
    </div>
  );
}

export default TestLogin;