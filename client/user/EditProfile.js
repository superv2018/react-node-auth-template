import React, { useState, useEffect }  from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';

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
        marginBottom: theme.spacing(2)},
        input: {
            display: 'none',
        },
        filename: {
            marginLeft: "10px"
        },
        bigAvatar: {
            width: 60,
            height: 60,
            margin: 10
          }
}))


const EditProfile = ({ match }) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: '',
        about: '',
        photo: '',
    })

    let userData = new FormData()
    
    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        userData.set(name, value)
         setState(prevState => ({
             ...prevState,
             [name] : value
         }))
    } 

    

    const init = () => {
        userData
        const jwt = auth.isAuthenticated()
        read({
            userId: match.params.userId
        }, {t: jwt.token}).then((data) => {
            if (data.error)
                setState({error: data.error})
            else
                setState({id: data._id,name: data.name, email: data.email, about: data.about})
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
        }, userData).then((data) => {
            console.log(userData)
            if (data.error) {
                setState({error: data.error})
            } else {
                setState({'redirectToProfile': true})
            }
        })

    }
   
    const photoUrl = state.id 
    ? `/api/users/photo/${state.id}?${new Date().getTime()}`
    : '/api/users/defaultphoto'

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
                <Avatar src={photoUrl} className={classes.bigAvatar} />
                <input accept="image/*" type="file"
                onChange={handleChange('photo')} id="icon-button-file"
                className={classes.input} />
                <label htmlFor="icon-button-file">
                    <Button color="default" component="span">
                        Upload <CloudUploadIcon />
                    </Button>
                </label> <span className={classes.filename}>{state.photo ? state.photo.name : ''}</span> <br />
                <TextField id="name" label="Name" className={classes.textField} value={state.name || ""} onChange={handleChange('name')} margin="normal" /> <br />
                <TextField id="about" label="About" className={classes.textField} value={state.about || ""} onChange={handleChange('about')} margin="normal" /> <br />
                <TextField id="email" label="Email" className={classes.textField} value={state.email || ""} onChange={handleChange('email')} margin="normal" /> <br />
                <TextField id="password" label="Password" className={classes.textField} value={state.password || ""} onChange={handleChange('password')} margin="normal" />
               

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