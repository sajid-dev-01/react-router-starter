import { createModule } from "@evyweb/ioctopus";

import { MockCrashReporterService } from "~/.server/shared/monitoring/crash-reporter/mock-crash-reporter";
// import { SentryCrashReporterService } from "~/.server/shared/monitoring/crash-reporter/sentry-crash-reporter";
import { MockInstrumentationService } from "~/.server/shared/monitoring/instrumentation/mock-instrumentation";
// import { SentryInstrumentationService } from "~/.server/shared/monitoring/instrumentation/sentry-instrumentation";
import { ConsoleLogger } from "~/.server/shared/monitoring/logger/console-logger";

import { DI_SYMBOLS } from "../types";

export function initMonitorModule() {
  const monitoringModule = createModule();

  if (process.env.NODE_ENV === "development") {
    monitoringModule
      .bind(DI_SYMBOLS.InstrumentationService)
      .toClass(MockInstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.CrashReporterService)
      .toClass(MockCrashReporterService, [DI_SYMBOLS.Logger]);
    monitoringModule.bind(DI_SYMBOLS.Logger).toClass(ConsoleLogger);
  } else {
    // monitoringModule
    //   .bind(DI_SYMBOLS.InstrumentationService)
    //   .toClass(SentryInstrumentationService);
    // monitoringModule
    //   .bind(DI_SYMBOLS.CrashReporterService)
    //   .toClass(SentryCrashReporterService);
    // monitoringModule.bind(DI_SYMBOLS.Logger).toClass(ConsoleLogger);
  }

  return monitoringModule;
}
