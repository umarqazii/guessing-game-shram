import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  } from 'mdb-react-ui-kit';
import axios from 'axios';
import logo from '../assets/logo.png'
import '../App.css';
 // Import your image

function Login() {

    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = '/game';
    axios.post('http://localhost:4000/login', {
      username: username,
      password: password
    })
      .then((res) => {
        console.log(res);

        //display a successful toast message
        
      })
      .catch((err) => {
        console.log(err);
        //display an error toast message
        
      });

  };


  return (
    <div className='App'>
      <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput label='Username' wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' id='formControlLg' type='text' size="lg" onChange={(e) => setUsername(e.target.value)} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

              <button className='mx-2 px-5 custom-btn' type='button' onClick={handleSubmit}>
                Login
              </button>


              <div>
                <br></br>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <br></br>
                
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
    </div>
  );
}

export default Login;