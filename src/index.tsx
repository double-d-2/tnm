import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import SportsWrapperComponent from "./wrappers/SportsWrapperComponent";
import AppLoader from "./components/AppLoader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SportsWrapperComponent>
    <Suspense fallback={<AppLoader />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </SportsWrapperComponent>
);
