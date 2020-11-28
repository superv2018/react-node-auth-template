import React, {useState, useEffect} from 'react'
import { list } from './api-user'

const Test = () => {
    const [users, setUsers] = useState([])

    const fetchData = () => {
       /*  fetch('/api/users', {
            method: 'GET',
        }) */
        list()
        .then(data => {
            console.log(data)
           return  setUsers(data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            hELLO THERE
        </div>
    )
}

export default Test