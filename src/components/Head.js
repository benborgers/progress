import React from "react"
import { Helmet } from "react-helmet-async"

export default () => {
  const title = "Progress"
  const description = "How much of the LHS school year have we made it through?"

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://figure.netlify.com/progress-share-image" />

      <meta property="twitter:card" content="summary_large_image" />

      <link rel="icon" href="https://emojicdn.elk.sh/🌖" />
    </Helmet>
  )
}