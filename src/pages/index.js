import React from 'react'
import { motion } from 'framer-motion'

import Row from '../components/Row'
import useCalculation from '../hooks/useCalculation'

export default function Index() {
    const calculation = useCalculation()

    return (
        <div className="p-4 sm:p-8">
            <motion.div
                className="text-gray-400 mb-8 sm:mb-16 sm:flex justify-between items-start space-y-1 sm:space-y-0"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1  }}
            >
                <p className="font-extrabold text-3xl">LHS Senior Countdown</p>
                <p className="font-bold flex items-center space-x-1 italic">our last day is {calculation.END.format('MMM    D')}</p>
            </motion.div>

            <div className="space-y-12 lg:space-y-8">
                <Row label="School days left" number={calculation.daysLeft} color="text-yellow-400" />
                <Row label="Weeks of school left" number={calculation.weeksLeft} color="text-orange-400" />
                <Row label="Hours until the end of the school year" number={calculation.minutesLeft} color="text-red-400" />
            </div>
        </div>
    )
}
