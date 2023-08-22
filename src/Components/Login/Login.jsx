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


function Login(props) {
    const navigate = useNavigate();
    const registerClick = () => {
        
        return navigate("/register");
    }

    return (
        <div className='background'>
           <video src = {Video_Bg} autoPlay loop muted></video>
           <div className = 'right-half-container'>
                <Card className='login-container'>
                    <CardContent>
                        <TextField id="outlined-basic" label="Email Address" variant="outlined" className='login-textfield'/>
                    </CardContent>

                    <CardContent>
                        <TextField id="outlined-basic" label="Password" variant="outlined" type = "password" className='login-textfield'/>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" style = {{marginLeft:"35%"}}>Login</Button>
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