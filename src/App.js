import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Router } from 'components/Router'
import { Helmet } from 'react-helmet'

import '../dist.css'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
    return (
        <Root>
            <Helmet>
                <title>LHS Senior Countdown</title>
                <link rel="icon" href="https://emojicdn.elk.sh/🕰️" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Helmet>

            <div>
                <React.Suspense fallback={<em>Loading...</em>}>
                    <Router>
                        <Routes path="*" />
                    </Router>
                </React.Suspense>
            </div>
        </Root>
    )
}

export default App
