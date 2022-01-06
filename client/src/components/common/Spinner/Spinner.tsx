import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

type PropsType = {
    width?: number
    height?: number
    color?: string
}
const Spinner: React.FC<PropsType> = ({
                                          width = 22,
                                          height = 22,
                                          color = "#00BFFF"
                                      }) => <Loader type="TailSpin" color={color} height={height} width={width}/>

export default Spinner