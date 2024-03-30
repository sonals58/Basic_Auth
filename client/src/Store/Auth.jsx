import { useContext, useState } from "react";
import { createContext } from "react";


export const AuthContext = createContext();

export const AuthProvider =({children}) => {

    const [token, setToken]= useState(localStorage.getItem( 'token' ));

    const storetokenInLS = (servertoken)=>{
        return localStorage.setItem('token', servertoken);
    };

    //logout ko akele dikhane ka tarika
    let isLoggedIn = !!token;
    console.log("isLoggedIn:",isLoggedIn);

    //tackling logout functionality
    const logoutUser =()=>{
        setToken("");
        return localStorage.removeItem( 'token');
    };

    return <AuthContext.Provider value={{isLoggedIn,storetokenInLS, logoutUser}}>
        {children}
    </AuthContext.Provider>
} 

// this provides a person who deliver the  data to any component that needs it, in this case is the function storetokenInLS
export const  useAuth= ()=>{
    const authContextValue = useContext(AuthContext) // here usecontext is like doremon, isne sab sama liya apne andr
    if(!authContextValue){
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return authContextValue;
};