import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Web3AuthProvider } from "./web3AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
    <Web3AuthProvider>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
    </Web3AuthProvider>
   
  </StrictMode>
);
