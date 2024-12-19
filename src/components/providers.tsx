import { PropsWithChildren } from "react";
import { NuqsAdapter } from "nuqs/adapters/react";

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
