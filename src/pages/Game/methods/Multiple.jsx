import React, { useContext } from "react"
import { AppContext } from "../../../context/AppContext"
import { distinct } from "../../../utils/distinct"

const Multiple = () => {
  const { app, setApp } = useContext(AppContext)

  const insertFile = content => {
    app.numbers.push(content)

    setApp({
      ...app,
      numbers: app.numbers
    })
  }

  return (
    <>
      <h3>
        玩法說明:{" "}
        <span className="gm-describe">
          手動輸入號碼，至少輸入1個五位數號碼組成一注(一次最大可投100000注)
        </span>
      </h3>
      <div className="bdr-t-black pt-1 gm-multiple-method">
        <div className="gm-multiple-method-describe">
          <div>
            <span className="dy-i">說明: </span>
            <ul className="dy-i" style={{ margin: 0, padding: 0, listStyleType: "none" }}>
              <li>1. 支持常見的各種單式格式，間隔符如：空格 回車 逗號</li>
              <li>2. 文件後綴僅支持 .txt或 .csv</li>
              <li>3. 文件大會久</li>
            </ul>
          </div>
        </div>
        <div className="pl-1 dy-grid" style={{ position: "relative" }}>
          <input
            className="gm-multiple-method-file"
            type="file"
            accept=".txt,.csv"
            onChange={e => {
              for (let i = 0, f; (f = e.target.files[i]); i++) {
                if (e.target.files[i].type === "text/csv") {
                  let reader = new FileReader()
                  reader.onload = (reader => {
                    return () => {
                      let result = []
                      let contents = reader.result
                      let res = contents.replace(/\s+/g, ",").split(",")

                      if (res.length % 5 != 0) {
                        alert("無效的注單")
                      } else {
                        const sourceLength = res.length
                        res.unshift("")
                        for (let resIndex = 1; resIndex <= sourceLength; resIndex++) {
                          if (resIndex % 5 == 0 && resIndex != 0) {
                            let staged = []
                            for (let use = 0; use <= 4; use++) {
                              const targetIndex = resIndex - use
                              staged.push(parseInt(res[targetIndex], 10))
                            }
                            result.push(staged.reverse())
                          }
                        }

                        const last = distinct(result)
                        last.forEach(res => {
                          const source = res.split(",").map(val => parseInt(val, 10))
                          insertFile(source)
                        })
                      }
                    }
                  })(reader)

                  reader.readAsText(f)
                } else {
                  let reader = new FileReader()
                  reader.onload = (reader => {
                    return () => {
                      let result = []
                      let contents = reader.result
                      let res = contents.replace(/[\n\r]/g, ",").split(",")

                      if (res.length % 5 != 0) {
                        alert("無效的注單")
                      } else {
                        const sourceLength = res.length
                        res.unshift("")
                        for (let resIndex = 1; resIndex <= sourceLength; resIndex++) {
                          if (resIndex % 5 == 0 && resIndex != 0) {
                            let staged = []
                            for (let use = 0; use <= 4; use++) {
                              const targetIndex = resIndex - use
                              staged.push(parseInt(res[targetIndex], 10))
                            }
                            result.push(staged.reverse())
                          }
                        }

                        const last = distinct(result)
                        last.forEach(res => {
                          const source = res.split(",").map(val => parseInt(val, 10))
                          insertFile(source)
                        })
                      }
                    }
                  })(reader)

                  reader.readAsText(f)
                }
              }
            }}
          />
          <button className="gm-button w-100 py-1" style={{ height: "60%" }}>
            導入注單
          </button>
        </div>
        <div className="pl-1 dy-grid">
          <button
            className="gm-button w-100 py-1"
            style={{ height: "60%" }}
            onClick={() => {
              alert("在導入時已自動處理")
            }}
          >
            刪除重複號
          </button>
        </div>
        <div className="pl-1 dy-grid" style={{ alignItems: "end" }}>
          <button
            className="gm-button w-100 py-1"
            style={{ height: "60%" }}
            onClick={() => {
              setApp({
                ...app,
                numbers: []
              })
            }}
          >
            清空
          </button>
        </div>
      </div>
      <button
        className={`gm-button w-100 mt-1 py-1 ${
          app.numbers.length != 0 ? "" : "gm-button-disabled"
        }`}
        style={{ textAlign: "center" }}
        onClick={() => goBet()}
      >
        下注
      </button>
    </>
  )
}

export default Multiple
