import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { isAuthenticated, signout } from './auth/AuthHelper'

const useStyle = makeStyles((theme) => ({
    logo:{
        flexGrow: 1
    }
}))

const Nav = () => {
    const classes = useStyle();
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.logo}>
                    Test App
                </Typography>
                <div>
                    <Button color='inherit' component={Link} to="/" >Home</Button>
                    {
                        isAuthenticated() ? (
                            <>
                                <Button color='inherit' component={Link} to="/profile">Profile</Button>
                                <Button color='inherit' onClick={()=>{signout(()=> navigate("/"))}}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button color='inherit' component={Link} to="/signin" >Login</Button>
                                <Button color='inherit' component={Link} to="/signup" >Registration</Button>
                            </>
                        )
                    }
                    
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Nav
