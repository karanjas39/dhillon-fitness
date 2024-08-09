"use client";

import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Provider } from "react-redux";
import { store } from "@/store/index";

interface Providertype {
  children: ReactNode;
}

function ClientProvider({ children }: Providertype) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default ClientProvider;
