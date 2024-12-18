import { serverEnv } from "../env/server-env";

const currentYear = new Date().getFullYear().toString();
const websiteLaunchYear = "2024";

export const appConfig = {
  name: serverEnv.APP_NAME,
  url: serverEnv.APP_URL,
  locale: "en-US",
  language: "en-us",
  source: {
    github: "https://github.com/sajid-dev-01/next-drizzle-starter.git",
  },
  companyName: serverEnv.COMPANY_NAME,
  companyAddr: "123 Main St, Anytown, ST 12345",
  copywriteYears:
    currentYear === websiteLaunchYear
      ? currentYear
      : `${websiteLaunchYear}-${currentYear}`,
  author: {
    github: "https://github.com/sajid-dev-01",
    twitter: "@sajidctg1",
  },
};
