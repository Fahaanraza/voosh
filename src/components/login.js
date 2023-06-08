import React, { useState } from 'react';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const API_BASE_URL = '/api/v1';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const history = useHistory();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login-user`, {
        phoneNumber,
        password,
        loginBy: 'normal',
      });
      const userName = response.data.userName;
      setToken(response.data.token);
      setUserId(response.data.userId);
      setIsLoggedIn(true);
      axios.defaults.headers.common['Authorization'] = `${response.data.token}`;
      history.push(`/user/${userName}`);
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        return message.error('User not authorised');
      }
      console.error('Error logging in:', err);
    }
  };


  return (
    <div style={{ width: '300px', margin: '0 auto', marginTop: '100px' }}>
      <h1>Login</h1>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="phoneNumber"
          value={phoneNumber} onChange={handlePhoneNumberChange}
          rules={[{ required: true, message: 'Please enter your phoneNumber' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          type="password"
          value={password} onChange={handlePasswordChange} 
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
