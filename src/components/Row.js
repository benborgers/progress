import React from 'react'

export default function Row({ label, number = '', color }) {
    return (
        <div className="lg:flex items-end justify-between lg:space-x-16 space-y-2 lg:space-y-0">
            <p className={`${color} text-gray-300 text-3xl sm:text-4xl font-serif`}>{label}</p>

            <p className="text-gray-100 text-3xl sm:text-5xl font-black tabular-nums">
                {number}
            </p>
        </div>
    )
}
