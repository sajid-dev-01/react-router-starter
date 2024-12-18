import { IInstrumentationService } from "~/.server/application/common/services/instrumentation";

export class MockInstrumentationService implements IInstrumentationService {
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
