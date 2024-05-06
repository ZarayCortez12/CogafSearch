import React, { createContext, useContext, useState } from 'react';
import { searchRequest } from "../api/search";


const AuthContext = createContext()

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usuarios, setUsuarios ] = useState([]);

  

    const search = async (user) => {
        try {
            console.log(user)
            const res = await searchRequest(user); 
            const userData = res.data;
            return userData;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                search,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}