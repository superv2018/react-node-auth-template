import React from 'react'
import  { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter  as Router } from 'react-router-dom'
import { indigo, pink } from '@material-ui/core/colors'
import { hot } from 'react-hot-loader'

import MainRouter from './MainRouter'



const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contrastText: '#000',
        },
        openTitle: indigo['400'],
        protectedTitle: pink['400'],
        type: 'light'
    }
})

const App = () => {

    //Remove the server-side injected CSS when React component mounts
    React.useEffect(() => {
        const jssStyles = document.getElementById('jss-server-side')
        if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])
    return (
    <Router>
        <MuiThemeProvider theme={theme}>
            <MainRouter />
        </MuiThemeProvider>
    </Router>
    )
    
}

export default hot(module)(App)