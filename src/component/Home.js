import React from "react";
import cat from '../image/cat.png';
import { NavLink } from "react-router-dom";
import '../css/HomeStyle.css';
import {Menu} from './Menu';


const Home = () => {
    let token = localStorage.getItem('token')
    if(token) 
    {
        return (
            <>
            <div>
                <Menu/>
            </div>
            <div className="mainSection">
            <div className="contentBox">
                    <h1>Meet your therapist with paws</h1>
                    <p>This page looks for cats from all around the world and posts about a new one each day! 
                        This is your chance to meet new best friend!
                    </p>
                    <div className="btnBox">
                        <div className="btn">
                        <NavLink to="/more" className="readMore">Read More</NavLink>
                        </div>
                    </div>
            </div>
            <div className="imgContainer">
                <img src={cat} alt="home"></img>
            </div>
            </div>
            </>
        );
    } else {
        return (
            <div style={{display: "flex", justifyContent:"center"}}>Please log in first...</div>
        );
    }
}

export default Home;