import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { EditProvider } from "./providers/edit-provider";
import { router } from "./router/router";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <EditProvider>
      <FluentProvider theme={webLightTheme}>
        <RouterProvider router={router} />
      </FluentProvider>
    </EditProvider>
  </React.StrictMode>,
);
