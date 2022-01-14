import React, {useState} from "react"

export const Context = React.createContext()

export const Provider = (props)=> { //componente para definição das variaveis globais
    const [wordSelected, setWordSelected] = useState()
    return (
        <Context.Provider value={{wordSelected, setWordSelected}}>{props.children}</Context.Provider>
    )
}