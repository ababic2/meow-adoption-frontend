import React from 'react';
import { NavLink } from "react-router-dom";
import paws from '../image/paws.png';
import PersonIcon from '@material-ui/icons/Person';
import '../css/MenuStyle.css';
import {  Button} from '@mui/material';
import IconButton from "@material-ui/core/IconButton";
import LogoutIcon from '@mui/icons-material/Logout';


const Menu = () => {

    const restoreLocalStorage = () => {
        localStorage.removeItem('currentUserRole');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('token');
    }

    
    return (
        <header>
            <div className="container container-flex">
                <div className="logoContainer"> 
                    <img src={paws} alt = "paws"/>
                </div>
                <nav>
                    <div className="list">
                      
                      <NavLink exact to="/home" className="listItem" activeClassName='activeItem'>Home</NavLink>
                      <NavLink to="/cats" className="listItem" activeClassName='activeItem'>Meet Cats</NavLink>
                      <NavLink to="/donations" className="listItem" activeClassName='activeItem'>Donate</NavLink>
                      <NavLink to="/articles" className="listItem" activeClassName='activeItem'>Articles</NavLink>
                    </div>
                </nav>    
                {/* <div className='icons'>
                 <PersonIcon/>
                </div> */}
                <NavLink to="/profile">
                <IconButton >
                    <PersonIcon />
                </IconButton>
                </NavLink>
                <NavLink to="/sign-in">
                    <IconButton onClick={restoreLocalStorage} >
                        <LogoutIcon />
                    </IconButton>
                </NavLink>
            </div>
        </header>
    );
}

export {Menu};