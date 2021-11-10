import React, { useState } from 'react'
import { Avatar, Box, Container, Grid, TextField, Card, CardContent, Button, Typography, makeStyles } from '@material-ui/core';
import { signup } from './auth/AuthHelper';


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
        color: 'blue',
    }
}))

const SignUp = () => {
    const classes = useStyle();
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [response, setResponse] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        setNameError(false);
        setEmailError(false);
        setPasswordError(false);

        if(name===''){
            setNameError(true)
        }
        if(email===''){
            setEmailError(true);
        }
        if(password===''){
            setPasswordError(true);
        }

        if(name && email && password){
            signup(name, email, password)
            .then(res => {
                // console.log("Response:"+res)
                if(res !== 'error'){
                    setResponse("Account created successfully. Please login to continue")
                } else {
                    setResponse("Something went wrong. Try again later.")
                }
            })
            .catch(err => console.log(err));
        }

        setName('');
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
                        Sign Up
                    </Typography>
                    <Typography className={classes.resp}>{response}</Typography>
                    <CardContent>
                        <form noValidate onSubmit={handleSignUp}>
                        <TextField
                                className={classes.field}
                                label="Name"
                                variant="outlined"
                                fullWidth
                                required
                                error={nameError}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
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
                            <TextField
                                className={classes.field}
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                required
                                error={passwordError}
                                value={password}
                            />
                            <Button
                                className={classes.field}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >Sign Up</Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </Container>
    )
}

export default SignUp
