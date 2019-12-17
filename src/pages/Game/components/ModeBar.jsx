import React, { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

const ModeBar = ({ publisher_id }) => {
  const { app, setApp } = useContext(AppContext)

  const options = [
    {
      id: 1,
      name: "直選複式",
      available: [1, 2]
    },
    {
      id: 2,
      name: "直選單式",
      available: [2]
    },
    {
      id: 3,
      name: "總和大小單雙",
      available: [1]
    }
  ]

  const setPlayerMethodId = id => {
    setApp({
      ...app,
      play_method: id,
      numbers: []
    })
  }

  return (
    <>
      <h3>玩法選擇</h3>
      <div className="gm-bar pb-1">
        {options.map((option, i) => (
          <button
            key={Math.random(8) + "player_method" + Math.random(10)}
            className={`gm-button ${i == 0 ? "" : "ml-1"} ${
              option.available.some(id => id == publisher_id) ? "" : "none"
            } ${app.play_method == option.id ? "gm-selected" : ""}`}
            onClick={() => setPlayerMethodId(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default ModeBar
