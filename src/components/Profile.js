import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'

const useStyle = makeStyles((theme)=>({
    box:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        marginTop: '25px',
        minWidth: '450px',
        padding: '5px'
    },
    title: {
        textAlign: 'center'
    },
    details:{
        "& p":{
            margin: '3px',
            fontSize: '25px'
        },
        "& label": {
            fontWeight: 'bold'
        }
    }
})) 

const Profile = () => {
    const classes = useStyle();
    const [user,setUser] = useState({})

    useEffect(() => {
        const token = localStorage.getItem("test_token");
        axios.get(`http://localhost:5000/users?q=${token}`)
        .then(res=>{
            // console.log(res);
            setUser(res.data[0]);
        })
        .catch(err => console.log(err))
    },[])
    return (
        <div className={classes.box}>
            <Card className={classes.card} variant="outlined">
                <Typography variant="h4" className={classes.title}>Your Profile</Typography>
                <CardContent className={classes.details}>
                    <p><label>ID: </label> {user.id}</p>
                    <hr />
                    <p><label>Name: </label> {user.name}</p>
                    <hr />
                    <p><label>Email: </label> {user.email}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Profile
