import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux';
import store from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import { MyContextProvider } from './components/Form/SelectCountries/Contexto.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <BrowserRouter>

    <MyContextProvider>
      <App />
    </MyContextProvider>
    
    </BrowserRouter>
  </Provider>
)
