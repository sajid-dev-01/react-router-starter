import { ICrashReporterService } from "~/.server/application/common/services/crash-reaporter";

export class MockCrashReporterService implements ICrashReporterService {
  report(_: any): string {
    return "errorId";
  }
}
