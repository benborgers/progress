/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"

export default () => {
  const [percent, setPercent] = useState()

  const firstDay = new Date(2019, 8 -1, 28).getTime()
  const lastDay = new Date(2020, 6 -1, 18).getTime()
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
  
    if(roundedPercent > 100 || roundedPercent < 0) {
      setPercent(`100.${"0".repeat(roundLength)}`)
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