import { Outlet } from "react-router";

import { KBar } from "~/components/kbar";
import SearchInput from "~/components/kbar/search-input";
import { AppSidebar } from "~/components/sidebar/app-sidebar";
import { ThemeToggle } from "~/components/theme-toggle";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-sidebar flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="inline-flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="mr-auto inline-flex items-center gap-2">
                <SearchInput />
              </div>
              <ThemeToggle />
            </div>
          </header>
          <main className="mt-4 px-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
