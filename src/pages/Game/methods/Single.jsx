import React, { useState, useContext, useEffect } from "react"
import { AppContext } from "../../../context/AppContext"

const Single = () => {
  const { app, setApp } = useContext(AppContext)
  const [betCond, setBetCond] = useState(false)
  const optionRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const unitRange = ["萬位", "千位", "百位", "十位", "個位"]
  const betCondJudge = () => {
    const currentCond =
      app.numbers[0].length != 0 &&
      app.numbers[1].length != 0 &&
      app.numbers[2].length != 0 &&
      app.numbers[3].length != 0 &&
      app.numbers[4].length != 0

    setBetCond(currentCond)
  }
  const hotKeys = [
    {
      name: "全",
      func: unit => {
        app.numbers[unit] = optionRange
        betCondJudge()

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    },
    {
      name: "奇",
      func: unit => {
        app.numbers[unit] = [1, 3, 5, 7, 9]
        betCondJudge()

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    },
    {
      name: "偶",
      func: unit => {
        app.numbers[unit] = [0, 2, 4, 6, 8]
        betCondJudge()

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    },
    {
      name: "大",
      func: unit => {
        app.numbers[unit] = [5, 6, 7, 8, 9]
        betCondJudge()

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    },
    {
      name: "小",
      func: unit => {
        app.numbers[unit] = [0, 1, 2, 3, 4]
        betCondJudge()

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    },
    {
      name: "清",
      func: unit => {
        app.numbers[unit] = []
        setBetCond(false)

        setApp({
          ...app,
          numbers: app.numbers
        })
      }
    }
  ]

  useEffect(() => {
    setApp({
      ...app,
      numbers: [[], [], [], [], []]
    })
  }, [])

  const checkDigit = (bets, cond) => bets.some(opt => opt == cond)
  const deleteDigit = (bets, cond) =>
    bets.splice(
      bets.findIndex(opt => opt == cond),
      1
    )

  const betNum = (digit, num) => {
    if (checkDigit(app.numbers[digit], num)) {
      deleteDigit(app.numbers[digit], num)
      setApp({
        ...app,
        numbers: app.numbers
      })
    } else {
      app.numbers[digit].push(num)
      setApp({
        ...app,
        numbers: app.numbers
      })
    }

    const currentCond =
      app.numbers[0].length != 0 &&
      app.numbers[1].length != 0 &&
      app.numbers[2].length != 0 &&
      app.numbers[3].length != 0 &&
      app.numbers[4].length != 0

    setBetCond(currentCond)
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

  return (
    <>
      <h3>
        玩法說明:{" "}
        <span className="gm-describe">從萬位、千位、百位、十位、個位各選一個號碼組成一注</span>
      </h3>
      <div>
        {unitRange.map((unit, unitIndex) => (
          <div
            key={Math.random(8) + unit}
            className={`gm-option-container w-100 bdr-b-black py-1 ${
              unitIndex == 0 ? "bdr-t-black" : ""
            }`}
          >
            <span
              className="dy-inline-flex fw-bold gm-option-name"
              style={{ lineHeight: "30px", flex: -1 }}
            >
              {unit}
            </span>

            {app.numbers[unitIndex] && (
              <div className="dy-inline-flex flex-grow-1" style={{ justifyContent: "center" }}>
                {optionRange.map((option, i) => (
                  <button
                    key={Math.random(5) + option}
                    className={`gm-option-button fw-bold ${i != 0 ? "ml-1" : ""} ${
                      checkDigit(app.numbers[unitIndex], option) ? "gm-option-selected" : ""
                    }`}
                    onClick={() => betNum(unitIndex, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            <div className="dy-inline-flex flex-grow-1" style={{ justifyContent: "center" }}>
              {hotKeys.map((key, i) => (
                <button
                  key={Math.random(5) + key.name}
                  className={`gm-option-key fw-bold ${i != 0 ? "ml-1" : ""}`}
                  onClick={() => key.func(unitIndex)}
                >
                  {key.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className={`gm-button w-100 mt-1 py-1 ${betCond ? "" : "gm-button-disabled"}`}
        style={{ textAlign: "center" }}
        onClick={() => goBet()}
      >
        下注
      </button>
    </>
  )
}

export default Single
