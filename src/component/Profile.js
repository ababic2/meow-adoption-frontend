import React from "react";
import {Menu} from './Menu';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, Button, G } from '@mui/material';
import { useState, useEffect } from "react"



const Profile = () => {

   
    const [name, setName] = useState([]);

    useEffect(() => {
        names()
    }, [])

    const names = async () => {
        const responce = await fetch('http://localhost:8080/login/user/1');
        setName(await responce.json())
        let x = name
    }

    let x = name

    return (
        <>
        <div>
            <Menu/>
        </div>
        <div className="services">
            <h1>Profile Info</h1>

            
            <Card sx={{ display: 'flex', textAlign:"center"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" color="text.secondary" component="div" >
                                Username: <br/>{name.payload.userName}
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                Password:<br/>{name.payload.password}
                                
                                </Typography>
                                <Typography variant="h5" color="text.secondary" component="div">
                                E-mail: <br/>{name.payload.password}
                               
                                </Typography>
                            </CardContent>
                            </CardActionArea>
                        </Card>
        </div>
        </>
    )
   
}

export default Profile;