import React from "react";
import {Menu} from './Menu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {  Button } from '@mui/material';

import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";


const axios = require('axios').default;



const Articles = () => {
    const [name, setName] = useState([]);

    useEffect(() => {
        names()
    }, [])
    
    const names = async () => {
        // role = localStorage.getItem('currentUserRole')
        // user_id = localStorage.getItem('currentUserId')
        const responce = await fetch('http://localhost:8085/api/catmisc/articles');
        setName(await responce.json())
    }

    let x = name

    const deleteRequest = (index) => {
        console.warn(index)
        console.warn(name[index])
        axios.delete('http://localhost:8085/api/catmisc/articles/' + name[index].id ).then(function (response) {
            if(response.status == 200){
                toast.warning("Deleting...", {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
            } 
        })
    }

    let role = localStorage.getItem('currentUserRole')

    if(role == 1) {

        return (
            <div>
                <div>
                    <Menu/>
                </div>
                <div>
                <h1> Articles</h1>
                <div style={{display: "flex", justifyContent:"center", marginBottom:"2em"}}>
                    <NavLink to="/create_article">
                        <Button variant="contained" color="success" >Create</Button>
                    </NavLink>
                </div>
                    {name.map((data, index) => {
                        return(
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{data.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div style={{display: "flex", justifyContent:"center"}}>
                                        <Button variant="contained" color="success" sx={{marginRight:"2em"}} onClick={()=>deleteRequest(index)}>Delete</Button>
                                        <Button variant="contained" color="success" >Edit</Button>
                                    </div>

                                    <Typography>
                                    {data.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    } 
                    )
                }
                </div>
            </div>
        );
    } else {
        
        return (
            <div>
                <div>
                    <Menu/>
                </div>
                <div>
                <h1> Articles</h1>
                    {name.map((data) => {
                        return(
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{data.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                    {data.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    } 
                    )
                }
                </div>
            </div>
        );
    }
}

export default Articles;