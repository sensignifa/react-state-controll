// * 主要概念是以物件 key對應 value為基礎
// * 若沒有將新增物件
// * 若重複，新 key將覆寫舊 key

function distinct(arr) {
  let obj = {}
  let i = 0
  let len = 0

  if (Array.isArray(arr) && arr.length > 0) {
    len = arr.length

    for (i = 0; i < len; i += 1) {
      obj[arr[i]] = arr[i]
    }

    return Object.keys(obj)
  }

  return []
}
