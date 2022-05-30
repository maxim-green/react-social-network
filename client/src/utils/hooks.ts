import breakpoints from 'assets/styles/breakpoints.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {getAuthUserData} from 'redux/reducers/auth.reducer'
import {StateType} from 'redux/store'

export const useAuthCheck = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAuthUserData())
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


const getWindowDimensions = (): [number, number] => ([ window.innerWidth,  window.innerHeight])
export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<[number, number]>(getWindowDimensions())
    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
}