import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {getAuthUserData} from '../store/reducers/auth.reducer'
import useTypedSelector from './useTypedSelector'

export const useAuth = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAuthUserData())
    }, [dispatch])

    return useTypedSelector(state => state.auth.authorized)
}
