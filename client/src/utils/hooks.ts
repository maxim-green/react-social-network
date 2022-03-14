import breakpoints from 'assets/styles/breakpoints.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {checkAuthorized} from 'redux/reducers/auth.reducer'
import {StateType} from 'redux/store'

export const useAuthCheck = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(checkAuthorized())
    }, [dispatch])

    return useSelector((state: StateType) => state.auth.authorized)
}

export const useBreakpoint = () => {
    const [width, setWidth] = useState<number>(0)

    const updateDimensions = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        updateDimensions()
        window.addEventListener('resize', updateDimensions)

        return () => window.addEventListener('resize', updateDimensions);
    }, [])

    const breakpointsObject: {[key: string]: boolean} = {}
    for (const [key, value] of Object.entries(breakpoints)) {
        breakpointsObject[key] = width < Number.parseInt(value)
    }

    return breakpointsObject
}