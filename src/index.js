import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'mobx-react'
import { injectGlobal } from 'styled-components'
import { RouterProvider } from 'react-router5'
import createRouter from './create-router'

import colors from 'constants/colors'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu Mono', monospace;
    background-color: ${colors[13]};
    color: ${colors[0]};
  }
`

const router = createRouter()

const Page = (
  <RouterProvider router={router}>
    <Provider>
      <App />
    </Provider>
  </RouterProvider>
)

router.start(() => {
  ReactDOM.render(Page, document.getElementById('root'))
})
