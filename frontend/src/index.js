import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import  * as worker from "./serviceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
// import { makeRoutes } from "./routes";
import App from "./App"
import {Provider} from 'react-redux'
import store from './store'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: 'top center',
  timeout: 2000,
  offset: '30px',
  transition: 'scale'
}



render(
 
    <BrowserRouter>
     <AlertProvider template={AlertTemplate} {...options}>
    <Provider store= {store}>
      <App />
      </Provider>
    </AlertProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
  worker.unregister();