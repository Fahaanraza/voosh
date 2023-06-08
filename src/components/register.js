import React, { useState } from 'react';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const API_BASE_URL = '/api/v1'; // Replace with your API base URL


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const phoneValidation = () => {
    return  (/^[0-9]{10}$/).test(phoneNumber)
  };

  const handleRegister = async () => {
    if (!phoneValidation(phoneNumber)) {
        return message.error('Give a valid Phone Number!');
      }
    try {
      const response = await axios.post(`${API_BASE_URL}/add-user`, {
        name,
        phoneNumber,
        password,
      });
      console.log(response.data);
      history.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div style={{ width: '300px', margin: '0 auto', marginTop: '100px' }}>
      <h1>Register</h1>
      <Form onFinish={handleRegister}>
        <Form.Item
          name="name"
          value={name} onChange={handleNameChange}
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          value={phoneNumber} onChange={handlePhoneNumberChange} 
          rules={[
            { required: true, message: 'Please enter your Phone Number' },
            { type: 'phoneNumber', message: 'Please enter a valid Phone Number' },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="password"
          value={password} onChange={handlePasswordChange}
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
