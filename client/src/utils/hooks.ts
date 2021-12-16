import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {checkAuthorized} from '../redux/reducers/auth.reducer'

export const useAuthCheck = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthorized())
    }, [dispatch])
}