import React from "react"
import { Redirect } from "@reach/router"

function NotFound() {
  return <Redirect to="/game" noThrow />
}

export default NotFound
