import React, { Component, useImperativeHandle } from "react";
// import SignUp from "../SignUp/signup.js";
import  '../css/login.css';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';
import { NavLink } from "react-router-dom";



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: ''
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
      }

      errorToasterShow(){
        toast.error('Doslo je do greške!', {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
      }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    componentDidMount(){
        localStorage.removeItem('currentUserRole');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('token');
    }
    
    onClick = event => {
        event.preventDefault();
        console.log("šaljem zahtjev")
        var user = {
            "userName": this.state.username,
	        "password": this.state.password
          };
        axios.post('http://localhost:8083/login/log', user ).then(function (response) {
            if(response.status == 200){
                
                localStorage.setItem('token', response.data.token);
                axios.get('http://localhost:8083/login/whoAmI',{
            headers: {
              Authorization: response.data.token 
            }}).then(res => {
                localStorage.setItem('currentUserRole', res.data.userRole);
                localStorage.setItem('currentUserId', res.data.userId);
                if(res.data.userRole=="1")
                    window.location.replace("/home");
                else if(res.data.userRole=="2" || res.data.userRole=="3")
                    window.location.replace("/home");
                })
                .catch(error =>{
                    this.errorToasterShow();
                })                          
            }
          })
          .catch(function (error) {
            toast.info("Wrong username or password!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
          });
        
    }
   
    
    render() {
        return (
            <div id="loginDiv">
            <h1>Sign In</h1>
            <ToastContainer></ToastContainer>
            <form onSubmit = {this.onClick}>               
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidateautoComplete="off">
                    <div className="formInputs">
                        <TextField label = "Username" id = "username" onChange={this.handleChangeUsername} type="username"/>
                    </div>
                    <div className="formInputs">
                        <TextField label="Password" id = "password" onChange={this.handleChangePassword} type="password"/>
                    </div>
                 </Box>

                <div className="buttonSubmit">
                    <Button variant="contained" color="warning" type="submit">Submit</Button>
                    <ToastContainer/>
                </div>
                <div  className="buttonSubmit">
                    <label style={{marginRight:"1em"}}>Don't have an account?</label>
                    <NavLink to="/signup">
                        <Button variant="contained" color="warning">Sign Up</Button>
                        </NavLink>
                </div>
                
            </form>
            </div>
        );
    }
}