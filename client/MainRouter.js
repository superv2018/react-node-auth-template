import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Test from './user/Test'
import Signup from './user/Signup'

class MainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" component={Users} />
                    <Route path="/test" component={Test} />
                    <Route path="/Signup" component={Signup} />
                </Switch>
            </div>
        )
    }
}

export default MainRouter