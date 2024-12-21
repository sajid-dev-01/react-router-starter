import { ICrashReporterService } from "~/.server/application/abstruct/infrastructure/crash-reaporter";

export class MockCrashReporterService implements ICrashReporterService {
  report(_: any): string {
    return "errorId";
  }
}
