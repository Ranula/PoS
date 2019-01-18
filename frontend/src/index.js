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



render(
    <BrowserRouter>
    <Provider store= {store}>
      <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
  worker.unregister();