import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {isAuth}=useSelector((store)=>store.authreducer)
    if (!isAuth) {
        return <Navigate to="/signin" />;
      }
    
      return children;
    }


export default PrivateRoute
