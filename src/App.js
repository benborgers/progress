import React from 'react'
import { Root, Routes, addPrefetchExcludes, Head } from 'react-static'

import { Router } from '@reach/router'
import ogImage from './images/og.jpg'

import '../dist.css'

function App() {
    return (
        <Root>
            <Head>
                <title>LHS Senior Countdown</title>
                <link rel="icon" href="https://emojicdn.elk.sh/🕰️" />
                <meta property="og:image" content={`https://progress.elk.sh${ogImage}`} />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

                {process.env.NODE_ENV === 'production' &&
                    <script src="https://anteater.benborgers.com/script.js" data-spa="auto" data-site="AKSIRHBI" defer></script>
                }
            </Head>

            <div>
                <React.Suspense fallback={<em>Loading...</em>}>
                    <Router>
                        <Routes default />
                    </Router>
                </React.Suspense>
            </div>
        </Root>
    )
}

export default App
