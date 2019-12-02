/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"
import { motion } from "framer-motion"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"

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


  const fadeInFromTop = {
    style: {
      y: -20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    },
    transition: {
      delay: .6
    }
  }

  return (
    <>
      <Head />
      <GlobalStyles />

      <div
        css={css`
          padding: 32px;

          display: grid;
          grid-template-rows: auto 30vh auto;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:  "logo exception"
                                ". ."
                                "percentage percentage";
        `}
      >
        <motion.p
          css={css`
            font-weight: 600;
            grid-area: logo;
            letter-spacing: -.02rem;
          `}
          {...fadeInFromTop}
        >
          progress
        </motion.p>

        <motion.div
          css={css`
            grid-area: percentage;
            justify-self: center
          `}
          style={{
            opacity: 0,
            scale: .8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: .3
          }}
        >
          <p
            css={css`
              font-weight: 900;
              font-size: 4rem;
              color: var(--text-500);
              font-style: italic;
              text-align: center;
            `}
          >
            {percent}%
          </p>

          <p
            css={css`
              font-size: 1.2rem;
              text-align: center;
              font-weight: 500;
              letter-spacing: -.02rem;
            `}
          >
            of the school year is over
          </p>
        </motion.div>

        {nextException &&
          <motion.p
            css={css`
              grid-area: exception;
              justify-self: end;
              line-height: 1.3;
              font-style: italic;
            `}
            {...fadeInFromTop}
            transition={{
              delay: .9
            }}
          >
            {"our next "}
            {nextException.reason === 0 ? "day off" : nextException.reason === 1 ? "half day" : "irregular day"}
            {" is "}
            {(new Date(nextException.year, nextException.month, nextException.day).toLocaleString("en-US", {
              timeZone: "America/New_York",
              weekday: "long",
              month: "long",
              day: "numeric"
            })).toLowerCase()}
            {"."}
          </motion.p>
        }
      </div>
    </>
  )
}