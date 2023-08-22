import React from 'react';
import TextField from '@mui/material/TextField';
import './Login.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Video_Bg from '../../Assets/Bg_Video.mp4';
import { Typography } from '@mui/material';
import Link from '@mui/material';
import { redirect, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";


function Login(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail  = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword= (event) => {
        setPassword(event.target.value);
    }

    const handleLoginButton = async () =>{
        const payload = {
            "Email" : email,
            "Password" : password
        }
        try{
            const data = await axios.post("http://localhost:8081/api/login", payload);
            window.location.href = 'http://localhost:19006?token=' + data.data.token;
        }catch(err){
            setEmail("");
            setPassword("");
            alert("Not Authorized");
        }
    }
    const registerClick = () => {
        
        return navigate("/register");
    }

    return (
        <div className='background'>
           <video src = {Video_Bg} autoPlay loop muted></video>
           <div className = 'right-half-container'>
                <Card className='login-container'>
                    <CardContent>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" onChange={handleEmail} className='login-textfield'/>
                    </CardContent>

                    <CardContent>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type = "password" onChange={handlePassword} className='login-textfield'/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" style = {{marginLeft:"35%"}} onClick={handleLoginButton}>Login</Button>
                    </CardActions>
                    <CardContent>
                        <span style = {{marginLeft:"30%"}}>
                            First time ? 
                        </span>
                        <span style = {{color:"blue"}} onClick={registerClick}>
                            {'  Register'}
                        </span>
                    </CardContent>  
                </Card>
           </div>
            
        </div>
    );
}

export default Login;