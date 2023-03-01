import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index from "./pages";
import Top from "./pages/Metadata";
import { getLinks } from "./router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: React.createElement(Index),
        },
        {
          path: getLinks().META.href,
          element: React.createElement(Top),
        },
        {
          path: getLinks().ACTORS.href,
          element: React.createElement(Top),
        },
        {
          path: getLinks().SYSTEM.href,
          element: React.createElement(Top),
        },
        {
          path: getLinks().CE.href,
          element: React.createElement(Top),
        },
      ])}
    />
  </React.StrictMode>
);
