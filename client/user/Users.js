import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Typography, List } from '@material-ui/core';
import { ArrowForward, Person } from '@material-ui/icons';
import { Link } from 'react-router-dom'
import  {list} from './api-user';

  const useStyles = makeStyles( theme => ({
    root: {
        padding: theme.spacing(4),
        margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
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
                    setUsers(data)
                })
            }
            
        useEffect(() => {
            fetchUser()
        }, [])
   
    
       
        const classes = useStyles()

        return (
            <Paper  className={classes.root} elevation={4}>
                <Typography variant="h5" color="primary" type="title" className={classes.title}>
                All Users
                </Typography>
                <List dense>
                    {users.map((item, i) => {
                        return <Link to={"/user/" + item._id} key={i}>
                            <ListItem>
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