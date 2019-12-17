import React from "react"

export const playList = [
  {
    describe: "從萬千百十個位各選一個號碼組成一注",
    page: (
      <div>
        <h3>one</h3>
      </div>
    )
  }
]

export const PlayMethod = ({ describe, children }) => {
  return (
    <>
      <h3>
        玩法說明: <span className="gm-describe">{describe}</span>
      </h3>

      <div>{children}</div>
    </>
  )
}
