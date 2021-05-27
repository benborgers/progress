import React from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

import Row from '../components/Row'
import useCalculation from '../hooks/useCalculation'

export default function Index() {
    const calculation = useCalculation()

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 0.2,
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0 }
    }

    const { width, height } = useWindowSize()

    return (
        <>
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
                    <Row
                        label="Days of school left"
                        hint="Only including full school days"
                        number={calculation.daysLeft}
                        color="text-yellow-400"
                        variants={item}
                    />

                    {/* <Row
                        label="Weeks of school left"
                        hint="Only including full school days"
                        number={calculation.weeksLeft}
                        color="text-orange-400"
                        variants={item}
                    /> */}

                    <Row
                        label="Hours until the end of the school year"
                        hint="Including all days"
                        number={calculation.hoursLeft}
                        color="text-red-400"
                        variants={item}
                    />

                    <Row
                        label="Percent through the school year"
                        hint="Including all days"
                        number={calculation.percent}
                        color="text-pink-400"
                        variants={item}
                    />
                </motion.div>
            </div>

            {calculation.hoursLeft === 0 && (
                <Confetti
                    height={height}
                    width={width}
                />
            )}
        </>
    )
}
