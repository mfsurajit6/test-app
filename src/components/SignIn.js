import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Container, Grid, TextField, Card, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import { signin, isAuthenticated } from './auth/AuthHelper';

const useStyle = makeStyles((theme) => ({
    card:{
        marginTop: '25px',
        minWidth: '450px',
        padding: '5px'
    },
    avatar: {
        height: '100px',
        width: '100px'
    },
    title: {
        textAlign: "center"
    },
    field: {
        marginTop: '8px'
    },
    resp: {
        display: 'block',
        textAlign: 'center',
        color: 'red',
    }
}))

const SignIn = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [response, setResponse] = useState('');

    if(isAuthenticated()){
        console.log("Authenticated");
        navigate("/"); 
        // return null;
    }

    const handleSignIn = (e) => {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if(email===''){
            setEmailError(true);
        }
        if(password===''){
            setPasswordError(true);
        }
        if(email&&password){
            signin(email, password)
            .then(res => {
                if(res === 'success'){
                    // <Navigate replace to="/" />
                    navigate("/");
                } else {
                    setResponse("Invalid Email or password");
                }
            })
            .catch(err => console.log(err));
        }
        setEmail('');
        setPassword('');
    }

    return (
        <Container>
        <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={4} >
                <Card className={classes.card} variant="outlined">
                    
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Avatar className={classes.avatar} />
                    </Box>
                    <Typography variant="h4" className={classes.title}>
                        Sign In
                    </Typography>
                    <Typography className={classes.resp}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleSignIn}>
                            <TextField
                                className={classes.field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                required
                                error={emailError}
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <TextField
                                className={classes.field}
                                type="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                error={passwordError}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button
                                className={classes.field}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >Sign In</Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </Container>
    )
}

export default SignIn
