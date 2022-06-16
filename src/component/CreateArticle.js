import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  Button, MenuItem } from '@mui/material';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Menu} from './Menu';



const axios = require('axios').default;




const CreateArticle = () => {

    let article = {
        title: '',
        content: ''
    }

    function getTitle(val) {
        article.title = val.target.value
        console.warn(article.title)
    }

    function getContent(val) {
        article.content = val.target.value
        console.warn(article.content)
    }

    
    const sendPostRequest = async() => {
        let x = article

        await axios.post('http://localhost:8085/api/catmisc/articles', article ).then(function (response) {
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
    
    return (
        <>
        <div>
            <Menu/>
        </div>
          <div>
              <h1>Create New Article</h1>
  
              <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidateautoComplete="off">
                  <div className="formInputs">
                      <TextField label = "Title" multiline onChange={getTitle}/>
                  </div>
                  <div className="formInputs">
                      <TextField label="Content" multiline onChange={getContent}/>
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

export default CreateArticle;