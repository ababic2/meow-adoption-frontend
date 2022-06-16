import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';

import '../css/CreateCat.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Menu} from './Menu';
import { ContactsOutlined } from "@material-ui/icons";

const axios = require('axios').default;


const EditDonation = () => {

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

    const getDonationRequest = async() => {
        console.warn("Saljem request")
        let id = localStorage.getItem('donation')
        console.warn(id)
        await axios.get('http://localhost:8080/donation/' + id).then(function (response) {
            if(response.status == 200){
                toast.info("Getting...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
            console.warn("............................")
            console.warn(donation.type)
            console.warn(donation.date)
            console.warn(donation.amount)
            console.warn(response.data.payload.type)


            if(donation.type == '') {
                console.warn("******")
                console.warn(response.data.payload.type)
                console.warn(response)
                donation.type = response.data.payload.type
            }
            if(donation.amount == 0) {
                donation.amount = response.data.payload.amount
                console.warn("___________*______")
            }
            if(donation.date == '')
                donation.date = response.data.payload.date
            donation.donatedSum = response.data.payload.donatedSum
            donation.user = response.data.payload.user
            console.warn(response.data.payload)
            console.warn("Poslao")
            console.warn(donation)

        })
    }

    const sendPutRequest = async() => {
        await getDonationRequest();
        let id = localStorage.getItem('donation')
        console.warn("LALALLALALALALLA")
        console.warn(donation)
        await axios.put('http://localhost:8080/donation/update/' + id, donation ).then(function (response) {
            if(response.status == 200){
                toast.info("Updating...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        }).catch(function (error) {
            toast.error("Wrong info!", {
                position: toast.POSITION.BOTTOM_CENTER
              });
        
          });
    }

 
    return (
        <>
        <div>
            <Menu/>
        </div>
          <div>
              <h1>Edit Donation</h1>
  
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
                  <Button variant="contained" color="success" onClick={sendPutRequest}>Save</Button>
                  <ToastContainer/>
              </div>
  
          </div>
          </>
      );
}

export default EditDonation;