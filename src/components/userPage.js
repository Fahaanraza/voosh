import React, { useState } from 'react';
import { Input, Button, Modal,message, Form,Table } from 'antd';
import axios from 'axios';
import { useHistory,useParams } from 'react-router-dom';
const API_BASE_URL = '/api/v1';

const UserPage = () => {
  const [subTotal, setSubTotal] = useState('');
  const [userId, setUserId] = useState('');
  const [orderPhoneNumber, setOrderPhoneNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const history = useHistory();
  const { userName } = useParams();

  const handleSubTotalChange = (e) => {
    setSubTotal(e.target.value);
  };

  const handleIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleOrderPhoneNumberChange = (e) => {
    setOrderPhoneNumber(e.target.value);
  };

  const  cols = [
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/logout`);
      history.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddOrder = async() => {
    const newOrder = {
        userId,
      subTotal,
      phoneNumber: orderPhoneNumber,
    };
   
    try {
        const response = await axios.post(`${API_BASE_URL}/add-order`, { userName,newOrder  });
        setSubTotal('');
        setOrderPhoneNumber('');
        setModalVisible(false);
        handleGetOrderDetails();
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          return message.error('User not authorised');
        }
        console.error('Error logging in:', err);
      }
  };

  const handleGetOrderDetails = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-order`, { params: { userName } });
        setOrderDetails(response.data)        
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          return message.error('User not authorised');
        }
        console.error('Error logging in:', err);
      }
  };


  return (
    <div style={{ width: '500px', margin: '0 auto', marginTop: '100px' }}>
        <div style={{display: 'flex', justifyContent: 'flex-end',position: 'relative' }}>
        <Button  style={{position: 'absolute', top: '10px', right: '10px' }} type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
        <>
      <h2>Add Order</h2>
      <Button type="primary" onClick={() => setModalVisible(true)}>
        Add Orders
      </Button>
      <Modal
        title="Add Order"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleAddOrder}
      >
        <Form>
            <Form.Item label="User ID">
            <Input type="number" value={userId} onChange={handleIdChange} />
          </Form.Item>
          <Form.Item label="Sub Total">
            <Input type="number" value={subTotal} onChange={handleSubTotalChange} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input type="text" value={orderPhoneNumber} onChange={handleOrderPhoneNumberChange} />
          </Form.Item>
        </Form>
      </Modal>
      <hr />
      <h2>Order Details</h2>
      <Button onClick={handleGetOrderDetails}>Get Order Details</Button>
      <Table 
      columns={cols}
      dataSource={orderDetails}
    />
        </>
    </div>
  );
};

export default UserPage;
