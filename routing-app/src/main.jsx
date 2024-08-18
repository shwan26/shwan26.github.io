import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root, { 
  loader as rootLoader,
  action as rootAction,
 } from "./routes/root"
import ErrorPage from "./error-pages";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import EditContact, {
  action as editAction,
} from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          /* the rest of the routes */
        ],
      },
      { index: true, element: <Index />},
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
        errorElement: <div>Opps! There was an error.</div>
      }
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);