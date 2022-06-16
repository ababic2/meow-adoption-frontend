import React from "react";
import { NavLink } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, Button, G } from '@mui/material';
import '../css/CreateCat.css';

import SearchBar from "material-ui-search-bar";
import { MenuItem, Select } from "@material-ui/core/";

import { useState, useEffect } from "react"
import { alignProperty } from "@mui/material/styles/cssUtils";
import { margin, textAlign } from "@mui/system";
import {Menu} from './Menu';
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

const MeetCat = () => {
    
    let history = useHistory();


    const [name, setName] = useState([]);

    useEffect(() => {
        names()
    }, [])

    const names = async () => {
        const responce = await fetch('http://localhost:8080/cat/');
        setName(await responce.json())
    }

    const openCreateCatPage = () => {
        <NavLink to="/createCatAccount" className="readMore">Create Cat Account</NavLink>
      }
    let token = localStorage.getItem('token')

    const deleteRequest = (index) => {
        console.warn(index)
        console.warn(name[index])
        axios.delete('http://localhost:8080/cat/' + name[index].id ).then(function (response) {
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

    const [criteria, setCriteria] = useState("1");
    const [searchItem, setSearchItem] = useState("");

    if(token) {

    return (
        <>
        <div>
            <Menu/>
        </div>
        <div className="services">
            <h1>Meet new best friends</h1>



            <div className="main-content">
        <Select
          displayEmpty
          onChange={e => setCriteria(e.target.value)}
          defaultValue={criteria}
        >
          <MenuItem disabled value="">
            <em>Search By</em>
          </MenuItem>
          <MenuItem value={1}>Vaccinated</MenuItem>
          <MenuItem value={2}>Chip</MenuItem>
          <MenuItem value={3}>Healthy</MenuItem>
        </Select>
        <br />
        <br />
        <SearchBar
          value={searchItem}
          onChange={value => {
            setSearchItem(value);
          }}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        />
      </div>
            






            <div className="btnBox">
                <div className="btn">
                <NavLink to="/cat" className="catAccount">Create Cat Account</NavLink>
                </div>
            </div>

            {name.map((data, index) => {
                         return (
                         <Card key = {data.description} sx={{ display: 'flex', textAlign:"center"}}>
                            <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" >
                                {data.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Description:<br/>
                                {data.description}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Species:
                                {data.species}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Vaccinated:{String(data.vaccinated)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Healthy:{String(data.healthy)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Chip:{String(data.chip)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                Contact Info:{String(data.contact)}
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
        </div>
        </>
    )
    } else {
        return (
            <div style={{display: "flex", justifyContent:"center"}}>Please log in first...</div>
        );
    }
}

export default MeetCat;