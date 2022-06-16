import React from "react";
import {Menu} from './Menu';

import  '../css/login.css';


const ReadMore = () => {
    
    return (
        <div>
            <Menu/>
            <div id="loginDiv"> 
            <h1>Read More</h1>
                This page is dedicated to help you find your new friend.
                <br/>
                You can create profile for your cat and give some informations so that others 
                can decide if cat fits them.
                <br/>
                Also, you can report/create donation.
                <br/>
                For fun you can read articles and solve quiz.
            </div>
            
        </div>
    );
}

export default ReadMore;