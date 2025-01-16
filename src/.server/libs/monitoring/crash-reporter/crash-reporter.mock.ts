import { Logger } from "../logger/logger";
import { CrashReporterService } from "./crash-reporter";

export class MockCrashReporterService implements CrashReporterService {
  constructor(private readonly logger: Logger) {}

  report(err: any): string {
    this.logger.error(err);
    return "errorId";
  }
}
