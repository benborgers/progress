import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import "normalize.css"

export default () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Helmet>

      <Global
        styles={css`
          * {
            font-family: "Inter", sans-serif;
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