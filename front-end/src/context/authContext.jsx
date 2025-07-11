import { useEffect } from "react";
import { createContext, useContext, useState } from "react";



export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [roleUser, setRoleUser] = useState(null);
    const [sampleStores, setSampleStores] = useState([]);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setAuthUser(storedUser);
            setRoleUser(storedUser.role)
        }
    }, []);
    


    return <AuthContext.Provider value={{ authUser, roleUser, setRoleUser, setAuthUser,sampleStores,setSampleStores }}>
        {children}
    </AuthContext.Provider>
}