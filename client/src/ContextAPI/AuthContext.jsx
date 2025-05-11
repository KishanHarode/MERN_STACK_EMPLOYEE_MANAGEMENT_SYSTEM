import React, { createContext } from 'react'

export const AuthContext_API = createContext();

const AuthContext = ({children}) => {
    const serverURL = "https://mern-stack-employee-management-system-qv7v.onrender.com/";
    const value = {
        serverURL,
    }
  return (
     <AuthContext_API.Provider value={value}>
        {children}
     </AuthContext_API.Provider>
  )
}

export default AuthContext
