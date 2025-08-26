"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      {...props}>
      {children}
    </NextThemesProvider>
  );
}
