import * as Sentry from "@sentry/nextjs";

import { ICrashReporterService } from "~/.server/application/common/services/crash-reaporter";

export class CrashReporterService implements ICrashReporterService {
  report(error: any): string {
    return Sentry.captureException(error);
  }
}
