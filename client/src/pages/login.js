import React, { Component } from 'react';
import axios from "axios";  
import MenuIcon from '@material-ui/icons/Menu';
import {Paper, Button, Snackbar, IconButton, Typography, Toolbar, TextField, AppBar } from '@material-ui/core';
import { Redirect } from 'react-router';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import ParticleComponent from '../components/particles';
import loginIcon from '../assets/2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

class Login extends Component {
    state = {
        email:"",
        password:"",
        error:null,
        message:null,
        token:null,
        redirect:false
    };

    componentWillMount() {
        let token = localStorage.getItem("token");
        axios.defaults.headers.common['Authorization'] = token;
        axios.post('/api/user')
        .then(resp=>{
            // console.log(resp.data);
            if(resp.data.status==="error")
                console.log(resp.data);
            else{
                this.setState({ redirect:true });
            }
        }).catch(err=>console.log(err));
    }

    login(){
        axios.post('/api/login', {email:this.state.email, password:this.state.password})
        .then(resp=>{
            console.log(resp.data)
            if(resp.data.status==="error")
                this.setState({error:resp.data.message});
            else{
                localStorage.setItem("token", "jwt "+resp.data.data.token);
                this.setState({token:resp.data.data.token, redirect:true});
            }
        }).catch(err=>console.log(err));
        // console.log("dgd", this.state.email, this.state.password);
    }

    register(){
        axios.post('/api/signup', {email:this.state.email, password:this.state.password})
        .then(resp=>{
            console.log(resp.data)
            if(resp.data.status==="error")
                this.setState({error:resp.data.message});
            else{
                this.setState({message:"Account created"});
            }
        }).catch(err=>console.log(err));
        
    }

    handleClose = () => {
        this.setState({error:null});
        this.setState({message:null});
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/threads'/>;
        }

        return ( 
            <div>
                <ParticleComponent />
                <div style={{position:"absolute", top:0, left:0, height:"100%", width:"100%"}}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            github.com/priyanshbalyan
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper elevation={1} style={{backgroundColor: '#ECEDF6', position:"absolute", top:"50%", transform:"translateY(-50%)", left:0, right:0, margin:"auto", padding: '60px 40px', maxWidth:400}}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img src={loginIcon} alt='login' height='70px' width='auto'/>
                    </div>
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <FontAwesomeIcon icon={faEnvelope} color='#afafaf'  size='2x' style={{margin: '25px 15px 0 0', padding: '5px'}} />
                        <TextField
                        
                            style={{backgroundColor: '#ECEDF6'}}
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            fullWidth
                            margin="normal"
                            variant="standard"
                            onChange={e=>this.setState({email:e.target.value})}/>
                    </div>
                    <div style={{display: 'flex', alignItems:'center'}}>
                    <FontAwesomeIcon icon={faLock} color='#afafaf' size='2x'  style={{margin: '25px 15px 0 0', padding: '5px'}} />
                    <TextField 
                        style={{backgroundColor: '#ECEDF6'}}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        onChange={e=>this.setState({password:e.target.value})}/>
                    </div>
                <br/>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                    <Button style={{marginRight:10, fontWeight: 600}} variant="outlined"  color="primary" onClick={e=>this.login()}>Login</Button>
                    <Button style={{fontWeight: 600}} variant="outlined" color="primary" onClick={e=>this.register()}>Register</Button>
                </div>
                <Snackbar 
                    open={(this.state.error||this.state.message) ? true:false} 
                    message={this.state.error || this.state.message}
                    variant="error"
                    autoHideDuration={4000}
                    onClose={this.handleClose}/>
                </Paper>
            </div>
            </div>
        );
    }
}

export default Login;