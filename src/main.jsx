import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './scss/main.scss'
import { store } from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
)
