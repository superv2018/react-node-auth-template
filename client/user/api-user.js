
//fetch data from backend

const create = (user) => {
    return fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then((res) => {
        return res.json()
    }).catch((err) => console.log(err))
}

const list = () => {
    return fetch('/api/users/', {
        method: 'GET',
    }).then(res => {
        return res.json()
    }).catch((err) => console.log(err))
}

const read = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t 
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

const update = (params, credentials, user) => {
    return fetch('/api/users/' + params.userId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        },
        body: user
    }).then((res) => {
        console.log(res)
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

const remove = (params, credentials) => {
    return fetch('/api/users/' + params.userId, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.t
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

const follow = (params, credentials, followId) => {
    return fetch('/api/users/follow', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId: params.userId, followId: followId})
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

const unfollow = (params, credentials, unfollowId) => {
    return fetch('/api/users/unfollow', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'Bearer ' + credentials.t
        },
        body: JSON.stringify({userId: params.userId, unfollowId: unfollowId})
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}
export { create, list, read, remove, update, follow, unfollow }