import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import axios from "axios";  
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Redirect } from 'react-router';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";

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
        axios.post('http://localhost:3001/api/user')
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
        axios.post('http://localhost:3001/api/login', {email:this.state.email, password:this.state.password})
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
        axios.post('http://localhost:3001/api/signup', {email:this.state.email, password:this.state.password})
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
                <Paper elevation={1} style={{marginLeft:"auto", marginRight:"auto", marginTop:20, padding:20, maxWidth:600}}>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={e=>this.setState({email:e.target.value})}/>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onChange={e=>this.setState({password:e.target.value})}/>
                <br/>
                <Button style={{marginRight:10}} variant="contained" color="primary" onClick={e=>this.login()}>Login</Button>
                <Button variant="contained" color="primary" onClick={e=>this.register()}>Register</Button>
                <Snackbar 
                    open={(this.state.error||this.state.message) ? true:false} 
                    message={this.state.error || this.state.message}
                    variant="error"
                    autoHideDuration={4000}
                    onClose={this.handleClose}/>
                </Paper>
            </div>
        );
    }
}

export default Login;