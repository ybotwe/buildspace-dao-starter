import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

//Import 3rdweb

import {ThirdwebWeb3Provider} from '@3rdweb/hooks';

const supportedChains = [3,4];

const connectors = {
  injected: {},
  walletconnect: {},
  walletlink: {
    appName: "charitydao",
    url: "https://thirdweb.com",
    darkMode: false,
  },
};



// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider 
      connectors={connectors} 
      supportedChains={supportedChains}
    >
      <div className="landing">
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
