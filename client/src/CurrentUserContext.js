import React, { createContext, useState, useEffect } from "react";
import Error from './ErrorPage';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        if (!currentUser) {
            fetch('/api/me/profile')
            .then((res) => res.json())
            .then((response) => {
                setCurrentUser(response.profile);
            })
            .catch((error) => {
                return <Error />
            })
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            setStatus("idle");
        }
    }, [currentUser]);
    
    return (
        <CurrentUserContext.Provider value={{currentUser, status, setStatus}}>
            {children}
        </CurrentUserContext.Provider>
    );
};