import { Outlet } from "react-router";

import Footer from "~/components/footer";

import Header from "./header";

export default function AuthLayout() {
  return (
    <>
      <Header />
      <main className="flex grow flex-col items-center justify-center gap-8 p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
