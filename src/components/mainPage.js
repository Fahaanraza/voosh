import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

const MainPage = () => {
  const history = useHistory();

  const handleRegister = () => {
    history.push('/register');
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("🚀 ~ file: mainPage.js:18 ~ handleGoogleLoginSuccess ~ response:", response)
    // Handle successful Google login here
    const { profileObj, tokenId } = response;
    const { email, name, imageUrl } = profileObj;

    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("🚀 ~ file: mainPage.js:26 ~ handleGoogleLoginFailure ~ error:", error)
    // Handle Google login failure here
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '50px', textAlign: 'center' }}>Welcome!</h1>
      <Button type="primary" onClick={handleRegister} style={{ width: '300px', height: '50px', marginBottom: '30px', fontSize: '24px' }}>
        Register
      </Button>
      <Button type="default" onClick={handleLogin} style={{ width: '300px', height: '50px', fontSize: '24px',marginBottom:'20px' }}>
        Login
      </Button>
      <GoogleLogin
        clientId="11128913331-39rp4ja31hoeufm684om3et1tnluf4ri.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        cookiePolicy="single_host_origin"
        style={{ width: '300px', height: '50px', fontSize: '24px' }}
      />
    </div>
  );
};

export default MainPage;
