import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
})

const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loginInfo = localStorage.getItem("isLoggedIn");
        if (loginInfo === '1') {
            setIsLoggedIn(true);
            console.log("test")
        }
    }, [])

    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", '1')
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.clear()
        setIsLoggedIn(false);
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }} >{props.children}</AuthContext.Provider>
    )
}


export default AuthContextProvider