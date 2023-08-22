import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './SignUp.css';
import Video_Bg from '../../Assets/Bg_Video.mp4';
import { redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

function SignUp(props) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleRegisterButton = async () => {
        try{
            console.log({
                "UserName" : userName, 
                "Email" : email, 
                "Password" : password
            });
            const data = await axios.post("http://localhost:8081/api/register", {
                "UserName" : userName, 
                "Email" : email, 
                "Password" : password
            })
            window.location.href = 'http://localhost:19006?token=' + data.data.token;
        }catch(err){
            setPassword("");
            setEmail("");
            setUserName("");
            alert(err);
        }
    }
    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleUserEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    return (
        <div className='background'>
        <video src = {Video_Bg} autoPlay loop muted></video>
        <div className = 'right-half-container'>
             <Card className='login-container'>
                <CardContent>
                     <TextField id="outlined-basic" label="User Name" variant="outlined" onChange = {handleUserName} className='login-textfield'/>
                 </CardContent>
                 <CardContent>
                     <TextField id="outlined-basic" label="Email Address" variant="outlined" onChange={handleUserEmail} className='login-textfield'/>
                 </CardContent>
                 <CardContent>
                     <TextField id="outlined-basic" label="Password" variant="outlined" type = "password" onChange={handlePassword} className='login-textfield'/>
                 </CardContent>
                 <CardActions>
                     <Button variant="contained" style = {{marginLeft:"35%"}} onClick={handleRegisterButton}>Register</Button>
                 </CardActions>

             </Card>
        </div>
         
     </div>
    );
}

export default SignUp;