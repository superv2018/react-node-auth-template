import React, { useState, useEffect }  from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Redirect } from 'react-router-dom'

import auth from '../auth/auth-helper'
import { read, update } from './api-user'

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


const EditProfile = ({ match }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: '',
        about: '',
    })
    
    const handleChange = (event) => {
        const { id, value } = event.target
         setState(prevState => ({
             ...prevState,
             [id] : value
         }))
    } 

    const init = () => {
        const jwt = auth.isAuthenticated()
        read({
            userId: match.params.userId
        }, {t: jwt.token}).then((data) => {
            if (data.error)
                setState({error: data.error})
            else
                setState({name: data.name, email: data.email, about: data.about})
        })
    }  
   
     useEffect(() => {
        init()
    }, []) 
    

    const clickSubmit = (e) => {
        e.preventDefault();

        const jwt = auth.isAuthenticated()

        const user = {
            name: state.name || undefined,
            email: state.email || undefined,
            password: state.password || undefined,
            about: state.about || undefined
        }

        update({
            userId: match.params.userId
        }, {
            t: jwt.token
        }, user).then((data) => {
            if (data.error) {
                setState({error: data.error})
            } else {
                setState({'userId': data._id, 'redirectToProfile': true})
            }
        })

    }
   
  

    const classes = useStyles() 

    const redirect = state.redirectToProfile

    if (redirect) {
        return <Redirect to={'/user/' + match.params.userId} /> 
      }

    return (
        <div>
             <Card className={classes.cards}>
                <CardContent>
                  <Typography type="headline" variant="h5" color="primary" className={classes.title}>
                      Edit Profile
                </Typography>  
              
                <TextField id="name" label="Name" className={classes.textField} value={state.name || ""} onChange={handleChange}/> <br />
                <TextField id="about" label="About" className={classes.textField} value={state.about || ""} onChange={handleChange}/> <br />
                <TextField id="email" label="Email" className={classes.textField} value={state.email || ""} onChange={handleChange}/> <br />
                <TextField id="password" label="Password" className={classes.textField} value={state.password || ""} onChange={handleChange}/>
               

                <br/> {
            state.error && (<Typography variant="h6" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {state.error}
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

export default EditProfile