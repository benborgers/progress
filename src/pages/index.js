import React from 'react'
import { motion } from 'framer-motion'

import Row from '../components/Row'
import useCalculation from '../hooks/useCalculation'

export default function Index() {
    const calculation = useCalculation()

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 0.5,
                delayChildren: 0.5,
                staggerChildren: 0.5
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="p-4 pb-16 sm:pt-8 sm:px-8">
            <motion.div
                className="text-gray-400 mb-8 sm:mb-16 sm:flex justify-between items-start space-y-1 sm:space-y-0"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1  }}
            >
                <p className="font-extrabold text-2xl sm:text-3xl">LHS Senior Countdown</p>
                <p className="text-gray-500 font-semibold flex items-center space-x-1 italic">progress.elk.sh</p>
            </motion.div>

            <motion.div
                className="space-y-12"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <Row label="Days of school left" number={calculation.daysLeft} color="text-yellow-400" variants={item} />
                <Row label="Weeks of school left" number={calculation.weeksLeft} color="text-orange-400" variants={item} />
                <Row label="Hours until the end of the school year" number={calculation.minutesLeft} color="text-red-400" variants={item} />
                <Row label="Percent through the school year" number={calculation.percent} color="text-pink-400" variants={item} />
            </motion.div>
        </div>
    )
}
