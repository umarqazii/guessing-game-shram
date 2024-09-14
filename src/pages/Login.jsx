import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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


function Login() {
  const navigate = useNavigate();
  let toastid = '';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    //e.preventDefault();

    //window.location.href = '/game';
    axios.post('https://guessing-game-api.vercel.app/cred/login', {
      username: username,
      password: password
    })
      .then((res) => {
        console.log(res.data.user.username);
        console.log(res.data.user._id);
        const userId = res.data.user._id;
        const username = res.data.user.username;
        toast.remove(toastid);
        toast.success('Successfully Logged in!');
        navigate(`/game/${userId}/${username}`);
        
      })
      .catch((err) => {
        console.log(err);
        //display an error toast message
        toast.remove(toastid);
        toast.error('Invalid username or password');
      });

  };

  const loginToast = () => {
    toastid = toast("Processing your request...", {
      icon: "⏳",
      duration: Infinity,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    
  }


  return (
    <div className='App' >
      
      <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>

      <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your login and password!</p>

              <MDBInput label='Username' wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' id='formControlLg' type='text' size="lg" onChange={(e) => setUsername(e.target.value)} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

              <button className='mx-2 px-5 custom-btn' type='button' onClick={e =>{handleSubmit(); loginToast(); } }>
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
    </div>
  );
}

export default Login;