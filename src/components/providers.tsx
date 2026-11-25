"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--toast-bg)",
            border: "1px solid var(--toast-border)",
            color: "var(--toast-text)",
          },
          className: "sonner-toast",
        }}
        theme="system"
      />
    </ThemeProvider>
  );
}
