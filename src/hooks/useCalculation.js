/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"

export default () => {
  const [percent, setPercent] = useState()

  const firstDay = new Date(2020, 9 -1, 14).getTime()
  const lastDay = new Date(2021, 6 -1, 16).getTime()
  const fullYear = lastDay - firstDay

  const update = () => {
    const now = new Date().getTime()

    const yearSoFar = now - firstDay
  
    const rawPercent = (yearSoFar / fullYear) * 100
  
    const roundLength = 7
    const roundFactor = Math.pow(10, roundLength)
    const roundedPercent = Math.round(rawPercent * roundFactor) / roundFactor

    let paddedPercent = roundedPercent
    const decimal = roundedPercent.toString().split(".")[1]
    const decimalLength = (decimal || "").length

    if(decimalLength < roundLength) {
      if(!decimal) {
        paddedPercent += "."
      }
      paddedPercent += "0".repeat(roundLength - decimalLength)
    }
  
    if(roundedPercent > 100) {
      setPercent(100)
    } else if(roundedPercent < 0) {
      setPercent(0)
    } else {
      setPercent(paddedPercent)
    }
  }

  useEffect(() => {
    update()
    const timer = setInterval(update, 50)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return percent
}