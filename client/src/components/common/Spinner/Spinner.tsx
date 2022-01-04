import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner: React.FC = (props) => <Loader type="TailSpin" color="#00BFFF" height={22} width={22} />

export default Spinner