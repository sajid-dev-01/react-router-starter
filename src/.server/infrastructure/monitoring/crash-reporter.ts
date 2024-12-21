import * as Sentry from "@sentry/nextjs";

import { ICrashReporterService } from "~/.server/application/abstruct/infrastructure/crash-reaporter";

export class CrashReporterService implements ICrashReporterService {
  report(error: any): string {
    return Sentry.captureException(error);
  }
}
