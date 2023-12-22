import { createContext, useState } from "react";

export const myContext = createContext();

export const MyContextProvider = ({ children }) => {
    const [countriesId, setCountriesId] = useState([]);

    return (
        <myContext.Provider value={{ countriesId, setCountriesId }}>
            {children}
        </myContext.Provider>
    )
}