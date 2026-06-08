"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/auth/AuthProvider";
import QueryProvider from "./QueryProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              color: "#fafafa",
              border: "1px solid #e5e5e5",
              borderRadius: "0",
            },
          }}
        />
      </QueryProvider>
    </AuthProvider>
  );
}
