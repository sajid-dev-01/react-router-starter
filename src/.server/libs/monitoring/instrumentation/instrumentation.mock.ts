import { InstrumentationService } from "./instrumentation";

export class MockInstrumentationService implements InstrumentationService {
  startSpan<T>(
    _: { name: string; op?: string; attributes?: Record<string, any> },
    callback: () => T
  ): T {
    return callback();
  }

  async instrumentServerAction<T>(
    _: string,
    __: Record<string, any>,
    callback: () => T
  ): Promise<T> {
    return callback();
  }
}
