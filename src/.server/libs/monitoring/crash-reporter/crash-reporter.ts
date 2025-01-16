export interface CrashReporterService {
  report(error: any): string;
}
