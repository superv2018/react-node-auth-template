import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography, List } from '@material-ui/core';
import { ArrowForward, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import  {list} from './api-user';

  const useStyles = makeStyles( theme => ({
    root: {
        padding: theme.spacing(4),
        margin: theme.spacing(6),
        maxWidth: 800,
        
    },
    title: {
        margin: theme.spacing(4),
        
    }
})) 
 


const Users = () => {
    const [users, setUsers] = useState([])
    
            const fetchUser = () => {
            list().then((data) => {
                    if (data.error)
                    console.log(data.error)
                    else
                    console.log(data)
                    setUsers(data)
                })
            }
            
        useEffect(() => {
            fetchUser()
        }, [])
   
    
       
        const classes = useStyles()

        return (
            <Paper  classNames={classes.root} elevation={4}>
                <Typography component="h2" color="primary" type="title" classNames={classes.title}>
                All Users
                </Typography>
                <List dense>
                    {users.map((item, i) => {
                        return <Link to={"/user/" + item._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar>
                                    <Person/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    })}
                </List>
            </Paper> 

        )
    }




export default Users