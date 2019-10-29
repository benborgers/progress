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
            color: var(--text-300);
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            --text-500: hsl(241, 90%, 10%);
            --text-300: hsl(241, 20%, 45%);

            --background: hsl(6, 100%, 90%);

            background-color: var(--background);
          }

          ::selection {
            background-color: var(--text-300);
            color: white;
          }
        `}
      />
    </>
  )
}