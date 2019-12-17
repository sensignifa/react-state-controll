import React from "react"
import Routes from "./Routes"
import { AppProvider } from "./context/AppContext"

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  )
}
