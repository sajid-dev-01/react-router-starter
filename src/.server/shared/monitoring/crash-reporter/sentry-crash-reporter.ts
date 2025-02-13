import * as Sentry from "@sentry/node";

import { CrashReporterService } from "./crash-reporter";

export class SentryCrashReporterService implements CrashReporterService {
  report(error: any): string {
    return Sentry.captureException(error);
  }
}
