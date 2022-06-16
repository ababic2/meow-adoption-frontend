import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';

import '../css/CreateCat.css';
import {Menu} from './Menu';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const axios = require('axios').default;



const CreateCatAccount = () => {

    let cat = {
        description: '',
        species: '',
        contact:'',
        vaccinated:false,
        healthy:true,
        chip:false,
        name: ''
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
    
    function getDescription(val) {
        cat.description = val.target.value
        console.warn(cat.description)
    }

    function getContact(val) {
        cat.contact = val.target.value
        console.warn(cat.contact)
    }

    function getName(val) {
        cat.name = val.target.value
        console.warn(cat.name)
    }
    function getHealth(val) {
        cat.healthy = val.target.value
        console.warn(cat.healthy)
    }
    function getSpecies(val) {
        cat.species = val.target.value
        console.warn(cat.species)
    }
    function getVaccine(val) {
        cat.vaccinated = val.target.value
        console.warn(cat.vaccinated)
    }
    function getChipStatus(val){
        cat.chip = val.target.value
        console.warn(cat)
    }   


    const sendPostRequest = async() => {

        await axios.post('http://localhost:8080/cat/', cat ).then(function (response) {
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
          let x = cat
    }

    const [currency, setCurrency] = React.useState('true');

  return (

    <>
    <div>
        <Menu/>
    </div>
        <div>
            <h1>Create Cat Account</h1>
            {/* <form className="contact">
                <div>
                    <label htmlFor="decsription">Description</label>
                    <input type="text" placeholder="Enter cats name"></input>
                </div>

            </form> */}
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidateautoComplete="off">
                <div className="formInputs">
                    <TextField label="Name" onChange={getName}/>
                </div>
                <div className="formInputs">
                    <TextField label="Description" multiline onChange={getDescription}/>
                    <TextField label="Contact" onChange={getContact}/>
                </div>
                <div className="formInputs">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Healthy"
                    value={currency}
                    onChange={getHealth}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField label="Species" multiline onChange={getSpecies}/>
                </div>
                <div className="formInputs">
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Vaccinated"
                    value={currency}
                    onChange={getVaccine}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField
                    id="outlined-select-currency"
                    select
                    label="Chip"
                    value={currency}
                    onChange={getChipStatus}
                    >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
            </Box>

            <div className="buttonSubmit">
                <Button variant="contained" color="success" onClick={sendPostRequest}>Save</Button>
            </div>

        </div>
        </>
    );
}

export default CreateCatAccount;