import React from "react"
import { css, Global } from "@emotion/core"
import { Helmet } from "react-helmet-async"

import "normalize.css"

export default () => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Spectral:500i,600,700" />
      </Helmet>

      <Global
        styles={css`
          * {
            font-family: var(--serif);
            color: var(--text-500);
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            --text-500: hsl(239, 40%, 24%);
            --text-300: hsl(239, 20%, 45%);

            --border: hsl(239, 10%, 80%);

            --background: hsl(47, 40%, 94%);

            --serif: "Spectral", serif;

            background-color: var(--background);
          }

          ::selection {
            background-color: var(--text-500);
            color: white;
          }
        `}
      />
    </>
  )
}