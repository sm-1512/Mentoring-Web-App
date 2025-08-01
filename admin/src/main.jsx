import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import MentorContextProvider from "./context/MentorContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <MentorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </MentorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
