import React from 'react'
import Button from '@material-ui/core/Button';

const FollowProfileButton = () => {
    const followClick = (props) => {
        props.onButtonClick(follow)
    }

    const unfollowClick = (props) => {
        props.onButtonClick(unfollow)
    }
    return (
        <div>
            {props.following
            ? (<Button variant="raised" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
        : (<Button variant="raised" color="primary" onClick={followClick}>Follow</Button>)}
        </div>
    )
}

export default FollowProfileButton