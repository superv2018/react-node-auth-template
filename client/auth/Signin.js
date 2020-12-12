import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import {Redirect, useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'

import { signin } from './api-auth'
import  auth  from './auth-helper'

const useStyles = makeStyles( theme => ({
    cards : {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 300
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)}
}))




const Signin = () => {

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [redirectToReferrer, setRedirectToReferrer] = useState(false)

    const location = useLocation()

    const handleChange = (event) => {
        const {id, value } = event.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const clickSubmit = (e) => {
        e.preventDefault()

        const user = {
            email: state.email || undefined,
            password: state.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                auth.authenticate(data, () => {
                    setRedirectToReferrer(true)
                }) 
            }
        })
    }

    const classes = useStyles()

    const { from } = location.state || {
        from: {
            pathname: '/'
        }
    }

    if (redirectToReferrer) {
        return (<Redirect to={from}/>)
    }

    return (
        <div>
           <Card className={classes.cards}>
                <CardContent>
                <Typography type="headline" variant="h5" color="primary" className={classes.title}>
                    Sign In
                </Typography>  
                <TextField id="email" label="Email" className={classes.textField} value={state.email} onChange={handleChange}/>
                <TextField id="password" label="Password" className={classes.textField} value={state.password} onChange={handleChange}/>

                <br/> {
            error && (<Typography variant="h6" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {error}
            </Typography>)
          }

                </CardContent>
                <CardActions>
                <Button onClick={clickSubmit} color="primary" variant="contained" className={classes.submit}>Submit</Button>
                </CardActions>
                </Card>
        </div>
    )
}

/* Signin.propTypes = {
    useStyles: PropTypes.object.isRequired
  } */
  

export default Signin