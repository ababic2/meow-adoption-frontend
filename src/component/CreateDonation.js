import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';

import '../css/CreateCat.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Menu} from './Menu';



const axios = require('axios').default;



const CreateDonation = () => {

    let donation = {
        type: '',
        amount: 0,
        date: '',
        donatedSum:0,
        user: {
            id:0,
            donated_sum:0
        }
    }

    const currencies = [
        {
          value: true,
          label: 'Yes',
        },
        {
            
          value: false,
          label: 'No',
        }
    ]
    
    function getType(val) {
        donation.type = val.target.value
        console.warn(donation.type)
    }

    function getAmount(val) {
        donation.amount = parseFloat(val.target.value)
        console.warn(donation.amount)
    }

    function getDate(val) {
        donation.date = val.target.value
        console.warn(donation.date)
    }

    const sendPostRequest = async() => {
        donation.user.id = parseInt(localStorage.getItem('currentUserId'));
        donation.user.donated_sum = 0
        donation.donatedSum = 0
        let x = donation;
        let user = {
            id:  donation.user.id,
            donated_sum: 0
        }
        axios.post('http://localhost:8080/donation/user/create', user );

        await axios.post('http://localhost:8080/donation/donations', donation ).then(function (response) {
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

    const [currency, setCurrency] = React.useState('true');

  return (
      <>
      <div>
          <Menu/>
      </div>
        <div>
            <h1>Create New Donation</h1>

            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidateautoComplete="off">
                <div className="formInputs">
                    <TextField label = "Type" multiline onChange={getType}/>
                </div>
                <div className="formInputs">
                    <TextField label="Date" multiline onChange={getDate}/>
                </div>
                <div className="formInputs">
                    <TextField label="Amount" onChange={getAmount}/>
                </div>
            </Box>

            <div className="buttonSubmit">
                <Button variant="contained" color="success" onClick={sendPostRequest}>Save</Button>
                <ToastContainer/>
            </div>

        </div>
        </>
    );
}

export default CreateDonation;