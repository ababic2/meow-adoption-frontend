import React from "react";
import '../css/DonationStyle.css';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, Button, G } from '@mui/material';


import {Menu} from './Menu';


import { useState, useEffect } from "react"
import { alignProperty } from "@mui/material/styles/cssUtils";
import { color, margin, textAlign } from "@mui/system";
import TextField from '@mui/material/TextField';
import { red } from "@mui/material/colors";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;


const Donate = () => {

    let history = useHistory();
  // use history.push('/some/path') here

    const [name, setName] = useState([]);

    useEffect(() => {
        names()
    }, [])
    

    let role = localStorage.getItem('currentUserRole');
    let user_id = localStorage.getItem('currentUserId');
    let editable = []
    let noneditable = []

    const names = async () => {
        role = localStorage.getItem('currentUserRole')
        user_id = localStorage.getItem('currentUserId')
        const responce = await fetch('http://localhost:8080/donation/donations');
        setName(await responce.json())
    }

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
    
    const deleteRequest = (index) => {
        console.warn(index)
        console.warn(name[index])
        axios.delete('http://localhost:8080/donation/donations/' + name[index].donation_id ).then(function (response) {
            if(response.status == 200){
                toast.warning("Deleting...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        })
    }

    const edit = (index) => {

        localStorage.removeItem('donation');
        console.warn(index)
        console.warn(name[index])
        localStorage.setItem('donation', name[index].donation_id)
        console.warn("___________")
        let x = localStorage.getItem('donation')
        console.warn(x)
        history.push('/edit_donation')
    }

    //ako je user id donacije(inedx)  isti kao u locak storage => show edit button

    for(let i = 0; i < name.length; i++){ 
        let x = name[i]
        if(name[i].user.id == user_id)
            editable.push(name[i]);
        else noneditable.push(name[i])
    }

    let x = editable
        return (
            <>
            <div>
                <Menu/>
            </div>
            <div>
               <h1> Donations</h1>
               <div className="btnBox">
                        <div className="btn">
                        <NavLink to="/create_donation" className="createDonation">Create New Donation</NavLink>
                        </div>
                    </div>
                    {editable.map((data, index) => {
                             return (
                             <Card key = {data.type} sx={{ display: 'flex', textAlign:"center"}}>
                                <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                    {data.type}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Date:<br/>
                                    {data.date}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Amount needed:
                                    {data.amount}
                                    </Typography>
                                    <div>
                                        <div>
                                            <Button variant="contained" color="success" id = "delete" onClick={()=>deleteRequest(index)}>Delete</Button>
                                        </div>
                                        <br/>
                                        <div>
                                            {/* <Button variant="contained" color="success" id = "edit" component={Link} to="/more">Edit</Button> */}
                                            <Button variant="contained" color="success" id = "edit" onClick={()=>edit(index)}>Edit</Button>
                                        </div>
                                        <ToastContainer/>
                                    </div>
                                </CardContent>
                                </CardActionArea>
                            </Card>
                             )
                }
                            )
                        
                    }



                    {noneditable.map((data, index) => {
                             return (
                             <Card key = {data.type} sx={{ display: 'flex', textAlign:"center"}}>
                                <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" >
                                    {data.type}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Date:<br/>
                                    {data.date}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Amount needed:
                                    {data.amount}
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                            </Card>
                             )
                }
                            )
                        
                    }
            </div>
            </>
        );
    } 

export default Donate;