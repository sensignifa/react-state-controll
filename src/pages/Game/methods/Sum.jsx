import React, { useContext } from "react"
import { AppContext } from "../../../context/AppContext"

const Sum = () => {
  const { app, setApp } = useContext(AppContext)

  const checkExist = cond => app.numbers.some(opt => opt == cond)
  const deleteExist = cond =>
    app.numbers.splice(
      app.numbers.findIndex(opt => opt == cond),
      1
    )

  const setBet = opt => {
    app.numbers.push(opt)
    setApp({
      ...app,
      numbers: app.numbers
    })
  }

  const betSizeHandler = option => {
    if (checkExist(1)) {
      deleteExist(1)
      setBet(option)
    } else if (checkExist(2)) {
      deleteExist(2)
      setBet(option)
    } else {
      setBet(option)
    }
  }

  const betOddHandler = option => {
    if (checkExist(3)) {
      deleteExist(3)
      setBet(option)
    } else if (checkExist(4)) {
      deleteExist(4)
      setBet(option)
    } else {
      setBet(option)
    }
  }

  const goBet = () => {
    const betForm = {
      publisher_id: app.publisher,
      playing_method_id: app.play_method,
      numbers: app.numbers
    }

    fetch("http://three.fake/v1/lottery/bet", {
      method: "POST",
      body: JSON.stringify(betForm)
    })
    // * After request successful, context will be clear
  }

  const sizeOptions = [
    {
      id: 1,
      name: "總和大"
    },
    {
      id: 2,
      name: "總和小"
    }
  ]

  const oddOptions = [
    {
      id: 3,
      name: "總和單"
    },
    {
      id: 4,
      name: "總和雙"
    }
  ]

  return (
    <>
      <h3>
        玩法說明: <span className="gm-describe">選擇一個號碼型態</span>
      </h3>
      <div className="gm-sum-method">
        {sizeOptions.map((option, i) => (
          <button
            key={Math.random(8) + "gm-sum-se"}
            className={`gm-sum-button ${i != 0 ? "ml-1" : ""} ${
              app.numbers.some(opt => opt == option.id) ? "gm-selected" : ""
            }`}
            onClick={() => betSizeHandler(option.id)}
          >
            {option.name}
          </button>
        ))}
        {oddOptions.map((option, i) => (
          <button
            key={Math.random(8) + "gm-sum-oe"}
            className={`gm-sum-button ml-1 ${
              app.numbers.some(opt => opt == option.id) ? "gm-selected" : ""
            }`}
            onClick={() => betOddHandler(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <button
        className={`gm-button w-100 mt-1 py-1 ${
          app.numbers.length == 0 ? "gm-button-disabled" : ""
        }`}
        style={{ textAlign: "center" }}
        onClick={() => goBet()}
      >
        下注
      </button>
    </>
  )
}

export default Sum
