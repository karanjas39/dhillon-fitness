"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

interface Providertype {
  children: ReactNode;
}

function ClientProvider({ children }: Providertype) {
  return (
    <>
      <Provider store={store}>
        <ProtectedRoutes>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </ProtectedRoutes>
      </Provider>
    </>
  );
}

export default ClientProvider;
