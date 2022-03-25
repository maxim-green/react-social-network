import React from 'react'
import {useAuthCheck} from 'utils/hooks'
import {Redirect} from 'react-router-dom'

const HomePage = () => {
    const authorized = useAuthCheck()
    if (authorized) {
        return <Redirect to={`/feed`}/>
    } else {
        return <Redirect to={`/login`}/>
    }
}

export default HomePage