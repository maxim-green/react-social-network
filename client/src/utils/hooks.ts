import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {checkAuthorized} from '../redux/reducers/auth.reducer'
import {StateType} from '../redux/store'

export const useAuthCheck = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthorized())
    }, [dispatch])

    return useSelector((state: StateType) => state.auth.authorized)
}