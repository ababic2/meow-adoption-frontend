import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  '../css/login.css';


const axios = require('axios').default;


const SignUp = () => {
    let user = {
        userName: '',
        email: '',
        cat: true,
        password: '',
        role: 1
    }


    const sendPostRequest = async() => {
        let x = user;

        await axios.post('http://localhost:8083/login/create', user ).then(function (response) {
            if(response.status == 200){
                toast.info("Creating...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        }).catch(function (error) {
            toast.error("Wrong info!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
        
          });
    }

    function getUsername(val) {
        user.userName = val.target.value
        console.warn(user.userName)
    }

    function getEmail(val) {
        user.email = val.target.value
        console.warn(user.email)
    }

    function getPassword(val) {
        user.password = val.target.value
        console.warn(user.password)
    }
    
    return (
        <div id="loginDiv">
            <h1>Registration</h1>

            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidateautoComplete="off">
                <div className="formInputs">
                    <TextField label = "Username" multiline onChange={getUsername}/>
                </div>
                <div className="formInputs">
                    <TextField label="E-mail" multiline onChange={getEmail}/>
                </div>
                <div className="formInputs">
                    <TextField label="Password" type="password" onChange={getPassword}/>
                </div>
            </Box>

            <div className="buttonSubmit">
                <Button variant="contained" color="success" onClick={sendPostRequest}>Save</Button>
                <ToastContainer/>
            </div>

        </div>
    );
}

export default SignUp;