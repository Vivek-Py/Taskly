import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./utils/reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import AppRoutes from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppRoutes />
      </div>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
