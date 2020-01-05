import React from "react"
import { css } from "@emotion/core"

import Head from "../components/Head"
import GlobalStyles from "../components/GlobalStyles"

import useCalculation from "../hooks/useCalculation"

export default () => {
  const { percent, daysLeft, nextException } = useCalculation()

  return (
    <>
      <Head />
      <GlobalStyles />

      <div
        css={css`
          min-height: 100vh;
          display: grid;
          grid-template-rows: max-content auto;

          @media (max-width: 640px) {
            div {
              border: none !important;
            }
          }
        `}
      >
        <header
          css={css`
            padding: 24px 16px;
            border-bottom: 1px solid var(--border);
          `}
        >
          <p
            css={css`
              text-align: center;
              font-size: 24px;
              font-weight: 600;
              letter-spacing: -.8px;
              line-height: 1.3;

              br {
                display: none;
              }

              @media (max-width: 640px) {
                br {
                  display: block;
                }
              }
            `}
          >
            How much school have <br />we made it through?
          </p>
        </header>

        <main
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-template-areas: "percentage percentage" 
                                "stats next";
            
            @media (max-width: 640px) {
              grid-template-columns: 1fr;
              grid-template-rows: auto auto auto;
              grid-template-areas: "percentage" "stats" "next";
            }
          `}
        >

          <div
            css={css`
              grid-area: percentage;
              border-bottom: 1px solid var(--border);
              padding: 48px 0;

              display: grid;
              place-items: center center;
            `}
          >
            <StatBox stat={percent ? percent + "%" : ""} description="Fig. 1. The percentage of the school year that is over." large />
          </div>

          <div
            css={css`
              grid-area: stats;
              border-right: 1px solid var(--border);
              padding: 48px 0;

              display: grid;
              place-items: center center;

              @media (max-width: 640px) {
                border-right: none;
                border-bottom: 1px solid var(--border);
              }
            `}
          >
            <StatBox stat={daysLeft} description="Fig. 2. The number of school days left." />
          </div>

          <div
            css={css`
              grid-area: next;
              padding: 48px 0;

              display: grid;
              place-items: center center;
            `}
          >
            <StatBox
              stat={nextException ? new Date(nextException.year, nextException.month, nextException.day).toLocaleString("en-US", {
                month: "long",
                day: "numeric"
              }) : ""}
              description={`Fig. 3. The date of our next ${nextException ? nextException.reason === 0 ? "day off" : 
              nextException.reason === 1 ? "half day":
              "unusual day" : ""}.`}
              last
            />
          </div>
        </main>
      </div>
    </>
  )
}

const StatBox = ({ stat, description, large=false, last=false }) => {
  return (
    <div
      css={css`
        padding: 0 16px;

        @media (max-width: 640px) {
          ${last && "margin-bottom: 32px;"}
        }
      `}
    >
      <p
        css={css`
          margin-bottom: 32px;
          text-align: center;

          font-size: ${large ? "96px" : "48px"};
          font-weight: ${large ? "700" : "600"};

          @media (max-width: 640px) {
            font-size: 48px;
          }
        `}
      >
        {stat}
      </p>

      <p
        css={css`
          font-weight: 500;
          font-style: italic;
          color: var(--text-300);
          text-align: center;
          line-height: 1.4;
        `}
      >
        {description}
      </p>
    </div>
  )
}