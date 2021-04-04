import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/New_York')

const START = dayjs.tz('2020-9-14 8:30')
const END = dayjs.tz('2021-05-28 12:00')
const startToEndMs = END.diff(START, 'millisecond')

const DATA = {
    '2021-3-29': 1,
    '2021-3-30': 1,
    '2021-3-31': 1,
    '2021-4-1': 1,
    '2021-4-5': 1,
    '2021-4-6': 1,
    '2021-4-7': 1,
    '2021-4-8': 1,
    '2021-4-9': 1,
    '2021-4-12': 1,
    '2021-4-13': 1,
    '2021-4-14': 1,
    '2021-4-15': 1,
    '2021-4-16': 1,
    '2021-4-26': 1,
    '2021-4-27': 1,
    '2021-4-28': 1,
    '2021-4-29': 1,
    '2021-4-30': 1,
    '2021-5-3': 1,
    '2021-5-4': 1,
    '2021-5-5': 1,
    '2021-5-6': 1,
    '2021-5-7': 1,
    '2021-5-10': 1,
    '2021-5-11': 1,
    '2021-5-12': 1,
    '2021-5-13': 1,
    '2021-5-14': 1,
    '2021-5-17': 1,
    '2021-5-18': 1,
    '2021-5-19': 1,
    '2021-5-20': 0.5,
    '2021-5-21': 1,
    '2021-5-24': 1,
    '2021-5-25': 1,
    '2021-5-26': 1,
    '2021-5-27': 1,
    '2021-5-28': 1,
}

const format = (number, places) => {
    const power = Math.pow(10, places)
    const rounded = Math.round(number * power) / power
    let [beforeDecimal, afterDecimal = ''] = rounded.toString().split('.')
    if(afterDecimal.length !== places) {
        afterDecimal += '0'.repeat(places - afterDecimal.length)
    }
    return `${parseInt(beforeDecimal).toLocaleString()}.${afterDecimal}`
}

export default function useCalculation() {
    const [minutesLeft, setMinutesLeft] = React.useState()
    const [daysLeft, setDaysLeft] = React.useState()
    const [weeksLeft, setWeeksLeft] = React.useState()
    const [percent, setPercent] = React.useState()

    useEffect(() => {
        setInterval(() => {
            const diffInHours = END.diff(dayjs(), 'hour', true)
            setMinutesLeft(
                diffInHours < 0 ? 0 : format(diffInHours, 5)
            )

            const startToNowMs = dayjs().diff(START, 'millisecond')
            let percent = startToNowMs / startToEndMs * 100
            setPercent(`${percent > 100 ? 100 : format(percent, 7)}%`)
        }, 10)

        const infrequentCalculation = () => {
            const dataLeft = Object.assign(DATA, {})
            // Remove all dates in the past
            for(const datestring in dataLeft) {
                const day = dayjs.tz(datestring)
                const endOfDay = day.hour(15)

                if(dayjs().isAfter(endOfDay)) {
                    delete dataLeft[datestring]
                }
            }

            const tempDaysLeft = Object.keys(dataLeft).length
            setDaysLeft(tempDaysLeft)

            const tempWeeksLeft = tempDaysLeft / 5
            if(Number.isInteger(tempWeeksLeft)) {
                setWeeksLeft(tempWeeksLeft)
            } else {
                const floor = Math.floor(tempWeeksLeft)
                setWeeksLeft(`${floor} weeks, ${tempDaysLeft - floor * 5} days`)
            }
        }

        setInterval(infrequentCalculation, 1000 * 60)
        infrequentCalculation()
    }, [])

    return {
        END,
        minutesLeft,
        daysLeft,
        weeksLeft,
        percent
    }
}
