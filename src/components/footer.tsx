import { appConfig } from "~/.server/configs/app-config";

export default function Footer() {
  return (
    <footer className="inline-flex w-full shrink-0 items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-gray-500 dark:text-gray-400">
        Copyright © {appConfig.copywriteYears} {appConfig.companyName} • All
        right reserved
      </p>
    </footer>
  );
}
