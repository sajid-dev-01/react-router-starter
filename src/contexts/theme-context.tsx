import { createContext, useContext, useEffect, useState } from "react";

type Theme = "system" | "dark" | "light";

type ContextType = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ContextType>({
  theme: "system",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const THEME_COOKIE_NAME = "theme";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    if (!theme) return;

    document.body.classList.remove("system");
    document.body.classList.remove("dark");
    document.body.classList.remove("light");
    document.body.classList.add(theme);

    document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}`;
  }, [theme]);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const value = cookies
      .find((c) => c.startsWith(THEME_COOKIE_NAME))
      ?.split("=")[1];

    if (value) setTheme(value as any);
  }, [setTheme]);

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};
