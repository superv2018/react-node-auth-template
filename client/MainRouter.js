import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Test from './user/Test'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import EditProfile from './user/EditProfile'
import Menu from './core/Menu'

const MainRouter = () => {

    //Remove the server-side injected CSS when React component mounts
    useEffect(() => {
        const jssStyles = document.getElementById('jss-server-side')
        if (jssStyles && jssStyles.parentNode)
        jssStyles.parentNode.removeChild(jssStyles)
    })
        return (
            <div>
                <Menu/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" exact component={Users} />
                    <Route path="/Signup" exact component={Signup} />
                    <Route path='/signin' exact component={Signin}/>
                    <PrivateRoute path="/user/edit/:userId" exact component={EditProfile} />
                    <Route path='/user/:userId' exact component={Profile}/> 
                </Switch>
            </div>
        )
    
}

export default MainRouter