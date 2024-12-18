import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types";

import { CrashReporterService } from "~/.server/infrastructure/common/services/crash-reporter";
import { MockCrashReporterService } from "~/.server/infrastructure/common/services/crash-reporter.mock";
import { InstrumentationService } from "~/.server/infrastructure/common/services/instrumentation";
import { MockInstrumentationService } from "~/.server/infrastructure/common/services/instrumentation.mock";

export function createMonitorModule() {
  const monitoringModule = createModule();

  if (process.env.NODE_ENV === "test") {
    monitoringModule
      .bind(DI_SYMBOLS.IInstrumentationService)
      .toClass(MockInstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(MockCrashReporterService);
  } else {
    monitoringModule
      .bind(DI_SYMBOLS.IInstrumentationService)
      .toClass(InstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(CrashReporterService);
  }

  return monitoringModule;
}
