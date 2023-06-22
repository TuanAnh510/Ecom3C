import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <GoogleOAuthProvider
          clientId={`722041318373-32h31v5k9bd5pnhisovdvnq12mb1eh5j.apps.googleusercontent.com`}
        >
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
