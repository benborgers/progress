/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react"

import data from "../data/days.js"

export default () => {
  const exceptions = []
  for(const date in data.exceptions) {
    const pieces = date.split("-")
    exceptions.push({
      year: Number(pieces[0]),
      month: pieces[1] -1,
      day: Number(pieces[2]),
      reason: data.exceptions[date]
    })
  }

  const getWeekdaysInclusive = (startDate, endDate) => {
    let count = 0
    let currentDate = new Date(startDate.getTime())
    
    while(currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay()
      const matchingException = exceptions.find(date => date.year === currentDate.getFullYear() && date.month === currentDate.getMonth() && date.day === currentDate.getDate())
      if(!((dayOfWeek === 6) || (dayOfWeek === 0))) {
        if(!matchingException) {
          count = count + 1
        } else if(matchingException.reason === 1) {
          count = count + .5
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    return count
  }

  const makeDate = dateString => {
    const pieces = dateString.split("-")
    return new Date(pieces[0], pieces[1] -1, pieces[2])
  }

  const [percent, setPercent] = useState()
  const [daysLeft, setDaysLeft] = useState()
  const [nextException, setNextException] = useState()

  const calculate = () => {
    const rawNow = new Date()
    const endTimeToday = new Date((new Date((new Date((new Date()).setHours(14)).setMinutes(25)))).setSeconds(0))
    const isAfterEndTime = rawNow > endTimeToday
    
    const now = {
      year: rawNow.getFullYear(),
      month: rawNow.getMonth(),
      day: rawNow.getDate() - (!isAfterEndTime ? 1 : 0)
    }

    const nowAsDate = new Date(now.year, now.month, now.day)

    const daysPassed = getWeekdaysInclusive(makeDate(data.bookends.first), nowAsDate)
    const totalDays = getWeekdaysInclusive(makeDate(data.bookends.first), makeDate(data.bookends.last))

    setDaysLeft(totalDays - daysPassed)
    
    const percent = Math.round(daysPassed/totalDays * 10000) / 100
    if(percent > 100) {
      setPercent(100)
    } else {
      setPercent(percent)
    }


    const foundNextException = exceptions.find(date => (new Date(date.year, date.month, date.day)) > nowAsDate)
    setNextException(foundNextException)
  }

  useEffect(() => {
    calculate()
  }, [])

  return {
    percent,
    daysLeft,
    nextException
  }
}