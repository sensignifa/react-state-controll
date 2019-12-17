import React, { useContext } from "react"
import { AppContext } from "../../context/AppContext"
import PublishBar from "./components/PublisherBar"
import ModeBar from "./components/ModeBar"
import MultipleMethod from "./methods/Multiple"
import SingleMethod from "./methods/Single"
import SumMethod from "./methods/Sum"

export default function Game() {
  const { app } = useContext(AppContext)

  return (
    <main>
      <div className="application-container">
        <PublishBar />
        <ModeBar publisher_id={app.publisher} />
        {app.play_method == 1 && <SingleMethod />}
        {app.play_method == 2 && <MultipleMethod />}
        {app.play_method == 3 && <SumMethod />}
      </div>
    </main>
  )
}
