import { ICrashReporterService } from "~/.server/application/abstruct/infrastructure/crash-reaporter.service";

export class MockCrashReporterService implements ICrashReporterService {
  report(_: any): string {
    return "errorId";
  }
}
