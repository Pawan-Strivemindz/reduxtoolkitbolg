import App from "./App";
import ReactDOM from "react-dom/client";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "./app/store";
import "./index.css";
import { fetchUsers } from "./features/users/usersSlice";

Store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
