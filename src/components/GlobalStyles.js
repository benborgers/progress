import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import "normalize.css"

export default () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:700&display=swap" />
      </Helmet>

      <Global
        styles={css`
          * {
            font-family: "Roboto Mono", sans-serif;
            color: var(--text);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            user-select: none;
          }

          body {
            --text: hsl(238, 100%, 7%);
            --accent: hsl(223, 96%, 77%);
            --background: hsl(0, 0%, 95%);

            background-color: var(--background);
          }
        `}
      />
    </>
  )
}