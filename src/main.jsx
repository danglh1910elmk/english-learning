import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { store } from "./store";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "@/features/auth/AuthProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                    <Toaster />
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </StrictMode>,
);
