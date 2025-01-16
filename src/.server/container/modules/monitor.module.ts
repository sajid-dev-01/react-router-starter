import { createModule } from "@evyweb/ioctopus";

import { MockCrashReporterService } from "~/.server/libs/monitoring/crash-reporter/crash-reporter.mock";
// import { SentryCrashReporterService } from "~/.server/libs/monitoring/crash-reporter/sentry-crash-reporter";
import { MockInstrumentationService } from "~/.server/libs/monitoring/instrumentation/instrumentation.mock";
// import { SentryInstrumentationService } from "~/.server/libs/monitoring/instrumentation/sentry-instrumentation";
import { ConsoleLogger } from "~/.server/libs/monitoring/logger/console-logger";

import { DI_SYMBOLS } from "../types";

export function initMonitorModule() {
  const monitoringModule = createModule();

  // if (process.env.NODE_ENV === "test") {
  monitoringModule
    .bind(DI_SYMBOLS.InstrumentationService)
    .toClass(MockInstrumentationService);
  monitoringModule
    .bind(DI_SYMBOLS.CrashReporterService)
    .toClass(MockCrashReporterService, [DI_SYMBOLS.Logger]);
  monitoringModule.bind(DI_SYMBOLS.Logger).toClass(ConsoleLogger);
  // } else {
  //   monitoringModule
  //     .bind(DI_SYMBOLS.InstrumentationService)
  //     .toClass(SentryInstrumentationService);
  //   monitoringModule
  //     .bind(DI_SYMBOLS.CrashReporterService)
  //     .toClass(SentryCrashReporterService);
  //   monitoringModule.bind(DI_SYMBOLS.Logger).toClass(ConsoleLogger);
  // }

  return monitoringModule;
}
