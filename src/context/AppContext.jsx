import React, { useState, createContext } from "react"

export const AppContext = createContext()

export const AppProvider = props => {
  const [app, setApp] = useState({
    publisher: 1,
    play_method: 0,
    numbers: []
  })

  const defaultContext = {
    app,
    setApp
  }

  return <AppContext.Provider value={defaultContext} {...props} />
}
