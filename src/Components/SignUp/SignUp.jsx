import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './SignUp.css';
import Video_Bg from '../../Assets/Bg_Video.mp4';
import { redirect, useNavigate } from "react-router-dom";

function SignUp(props) {
    const navigate = useNavigate();
    return (
        <div className='background'>
        
        <video src = {Video_Bg} autoPlay loop muted></video>
        <div className = 'right-half-container'>
             <Card className='login-container'>
                <CardContent>
                     <TextField id="outlined-basic" label="User Name" variant="outlined" className='login-textfield'/>
                 </CardContent>
                 <CardContent>
                     <TextField id="outlined-basic" label="Email Address" variant="outlined" className='login-textfield'/>
                 </CardContent>
                 <CardContent>
                     <TextField id="outlined-basic" label="Password" variant="outlined" type = "password" className='login-textfield'/>
                 </CardContent>
                 <CardActions>
                     <Button variant="contained" style = {{marginLeft:"35%"}}>Register</Button>
                 </CardActions>

             </Card>
        </div>
         
     </div>
    );
}

export default SignUp;