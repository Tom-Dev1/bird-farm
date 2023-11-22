import React from "react";
import { useState } from "react";

export const BirdContext = React.createContext();


export function BirdProvider({ children }) {
    const [category, setCategory] = useState('');
    const [sex, setSex] = useState('');

    return (
        <BirdContext.Provider value={{ category, setCategory, sex, setSex }}>
            {children}
        </BirdContext.Provider>
    );
}