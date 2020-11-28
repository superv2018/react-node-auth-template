import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {Card, CardContent, CardMedia } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import burgImg from '../assets/images/burg.jpg' 
import { Link} from 'react-router-dom'

const styles = theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary
    }, 
    media: {
        minHeight: 330
    }
})

class Home extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <Link to="/users">User</Link>
                <p></p>
                <Link to="/test">Test</Link>
                <Link to="/signup">Signup</Link>
                <Card className={classes.card} >
                    <Typography type="headline" component="h2" className={classes.title}>
                        Home Page
                    </Typography>
                    <CardMedia className={classes.media} image={burgImg}
                    title="Burg" />
                    <CardContent>
                        <Typography type="body1" component="p">
                            Welcome to our page
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles) (Home)