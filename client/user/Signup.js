import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link }from 'react-router-dom'



import { create } from './api-user'


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

const Signup = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [ open, setOpen ] = useState(false)
    const [ error, setError ] = useState('')
  
  

   const handleChange = (event) => {
       const { id, value } = event.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
   } 

   

  /*  const handleChange = (e) => {
    e.preventDefault();
    console.log('button clicked', e.target)
   } */

    const clickSubmit = (e) => {
        e.preventDefault();

        const user = {
            name: state.name || undefined,
            email: state.email || undefined,
            password: state.password || undefined,
            
        }

        create(user).then((data) => {
            console.log(data)
            if (data.error)
                setError(data.error)
             else 
                setError('')
                setOpen(true) 
        })
    } 

    const classes = useStyles()
    
        return (<div>
            <Card className={classes.cards}>
                <CardContent>
                  <Typography type="headline" variant="h5" color="primary" className={classes.title}>
                      Sign Up
                </Typography>  
              
                <TextField id="name" label="Name" className={classes.textField} value={state.name} onChange={handleChange}/>
                <TextField id="email" label="Email" className={classes.textField} value={state.email} onChange={handleChange}/>
                <TextField id="password" label="Password" className={classes.textField} value={state.password} onChange={handleChange}/>

                </CardContent>
                <CardActions>
          <Button onClick={clickSubmit} color="primary" variant="contained" className={classes.submit}>Submit</Button>
        </CardActions>
            </Card>
             <Dialog open={open} disableBackdropClick={true}>
             <DialogTitle>New Account</DialogTitle>
             <DialogContent>
               <DialogContentText>
                 New account successfully created.
               </DialogContentText>
             </DialogContent>
             <DialogActions>
               <Link to="/signin">
                 <Button color="primary" autoFocus="autoFocus" variant="contained">
                   Sign In
                 </Button>
               </Link>
             </DialogActions>
           </Dialog>
           </div>
        )
    }

export default Signup