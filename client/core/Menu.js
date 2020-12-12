
import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom'

import auth from '../auth/auth-helper'

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return {color: '#ff4081'}
    else
       return {color: '#ffffff'}
}

const Menu = withRouter(({history}) => (<div>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit">
                MERN APP
            </Typography>
            <Link to="/">
                <IconButton aria-label="Home" style={isActive(history, "/")}>
                    <HomeIcon />
                </IconButton>
            </Link>
            <Link to="/users">
                <Button style={isActive(history, "/users")} underline='none'>Users</Button>
            </Link>
            {
                !auth.isAuthenticated() && (<span>
                    <Link to="signup">
                        <Button style={isActive(history, "/signup")}>
                        Sign Up 
                        </Button>
                    </Link>
                    <Link to="/signin" underline='none'>
                        <Button style={isActive(history, "/signin")}>
                            Sign In
                        </Button>
                    </Link>
                </span>)
            }
            {
                auth.isAuthenticated() && (<span>
                    <Link to={"/user/" + auth.isAuthenticated().user._id}>
                        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
                    </Link>
                    <Button color="inherit" onClick={() => {
                        auth.signout(() => history.push("/"))
                    }}>Sign Out</Button>
                </span>)
            }
        </Toolbar>
    </AppBar>
    </div>))

    export default Menu