import React from "react"
import { Helmet } from "react-helmet-async"

export default () => {
  const title = "Progress"
  const description = "How much of the LHS school year have we made it through?"

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://figure.netlify.com/progress-share-image" />

      <link rel="icon" href="https://emojicdn.elk.sh/🌖" />
    </Helmet>
  )
}