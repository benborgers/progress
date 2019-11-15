import React from "react"
import { Helmet } from "react-helmet-async"

export default () => {
  const title = "progress"
  const description = "Keeping track of how much of the LHS school year we've made it through."

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <link rel="icon" href="https://emojicdn.elk.sh/❄️" />
    </Helmet>
  )
}