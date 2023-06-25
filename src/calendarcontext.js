import React from "react";
import { useState } from "react";
import { createContext } from "react";

export  const CalendarContext = createContext();

export  const  CalendarProvider = ( props ) => {
    
    const [alltask, setassigntask] = useState ([]);
    return(
        <CalendarContext.Provider value={[alltask, setassigntask]}>
            {props.children}
        </CalendarContext.Provider>
    );
}