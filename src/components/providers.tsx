import { NuqsAdapter } from "nuqs/adapters/react";
import { PropsWithChildren } from "react";

import { ThemeProvider } from "~/contexts/theme-context";

import { AlertDialogProvider } from "./ui-extension/alert";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <AlertDialogProvider>{children}</AlertDialogProvider>
      </ThemeProvider>
    </NuqsAdapter>
  );
};
