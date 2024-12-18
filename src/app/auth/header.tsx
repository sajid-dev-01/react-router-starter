import { useState } from "react";
import { Link } from "react-router";

import { Logo } from "~/components/logo";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";

const navMenu = [
  { title: "Features", url: "#features" },
  { title: "Testimonials", url: "#testimonials" },
  { title: "Pricing", url: "#pricing" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 border-b">
      <div className="container flex items-center py-3">
        <Button
          className="group md:hidden"
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="pointer-events-none"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12L20 12"
              className="origin-center -translate-y-[7px] transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            />
            <path
              d="M4 12H20"
              className="origin-center transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            />
            <path
              d="M4 12H20"
              className="origin-center translate-y-[7px] transition-all duration-500 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            />
          </svg>
        </Button>

        <div className="mr-auto hidden items-center gap-3 md:flex">
          <Link className="items-center justify-center" to="/">
            <Logo />
            <span className="sr-only">Logo</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navMenu.map((menu) => (
                <NavigationMenuItem key={menu.title}>
                  <Link to={menu.url} className={navigationMenuTriggerStyle()}>
                    {menu.title}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="ml-auto flex gap-3 md:ml-0">
          <ThemeToggle />
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="bg-background flex flex-col items-center py-4">
            {navMenu.map((menu) => (
              <Link key={menu.title} className="px-4 py-2" to={menu.url}>
                {menu.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
