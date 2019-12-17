import React, { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

const PublisherBar = () => {
  const { app, setApp } = useContext(AppContext)

  const options = [
    {
      id: 1,
      name: "重慶時時彩"
    },
    {
      id: 2,
      name: "北京11選5"
    }
  ]

  const setPublisherId = id => {
    setApp({
      ...app,
      publisher: id,
      play_method: 0
    })
  }

  return (
    <>
      <h3>彩種選擇</h3>
      <div className="gm-bar pb-1">
        {options.map((option, i) => (
          <button
            key={Math.random(24) + "publisher"}
            className={`gm-button ${i == 0 ? "" : "ml-1"} ${
              app.publisher == option.id ? "gm-selected" : ""
            }`}
            onClick={() => setPublisherId(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default PublisherBar
