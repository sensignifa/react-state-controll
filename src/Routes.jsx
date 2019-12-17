import React from "react"
import { Router } from "@reach/router"

import Game from "./pages/Game/index"
import NotFound from "./pages/NotFound"

function Routes() {
  return (
    <Router>
      <Game path="/game" />
      <NotFound default />
    </Router>
  )
}

export default Routes
