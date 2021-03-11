import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"
import { motion } from "framer-motion"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"

import useCalculation from "../hooks/useCalculation"

export default () => {
    const percent = useCalculation()

    const [height, setHeight] = useState()

    useEffect(() => {
        const listener = () => {
            setHeight(window.innerHeight)
        }

        listener()

        window.addEventListener("resize", listener)

        return () => {
            window.removeEventListener("resize", listener)
        }
    }, [])

    return (
        <>
            <Head />
            <GlobalStyles />

            <div
                css={css`
                display: grid;
                height: ${height ? height + "px" : "100vh"};

                > * {
                    grid-row: 1;
                    grid-column: 1;
                }
                `}
            >
                <motion.h2
                    css={css`
                        text-align: center;
                        font-size: 2rem;
                        line-height: 1.3;
                        padding: 0 1rem;
                        color: var(--text-light);

                        @media (max-width: 640px) {
                            font-size: 1.3rem;
                        }
                    `}
                    initial={{
                        y: -100
                    }}
                    animate={{
                        y: 0
                    }}
                    transition={{
                        delay: 0.7
                    }}
                >
                    LHS class of 2021
                    <br
                        css={css`
                            display: none;

                            @media (max-width: 450px) {
                                display: block;
                            }
                        `}
                    />
                    {' '}
                    school year progress
                </motion.h2>

                <motion.div
                    css={css`
                        background-color: var(--accent);
                        align-self: end;
                    `}
                    initial={{ height: '0%' }}
                    animate={{
                        height: (percent || 0) + '%'
                    }}
                />

                <motion.h1
                    css={css`
                        margin: 0;
                        font-weight: 800;
                        font-size: 10vw;
                        justify-self: center;
                        align-self: center;
                        letter-spacing: -0.4vw;
                        font-feature-settings: "tnum";
                    `}
                    variants={{
                        hidden: {
                            scale: 0
                        },
                        visible: {
                            scale: 1,
                            transition: {
                                delay: .5
                            }
                        }
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {percent}%
                </motion.h1>
            </div>
        </>
    )
}
