import React, {createContext} from 'react'

export const FiltersContext = createContext({});

export function FiltersProvider({ children }){
    return (
        <FiltersContext.Provider value={{}}>
            {children}
        </FiltersContext.Provider>
    );
}