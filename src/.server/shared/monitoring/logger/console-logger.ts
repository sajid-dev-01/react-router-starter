import { Logger } from "./logger";

export class ConsoleLogger implements Logger {
  log(item: any): void {
    console.log(item);
  }

  debug(item: any): void {
    console.debug(item);
  }

  info(item: any): void {
    console.info(item);
  }

  warn(item: any): void {
    console.warn(item);
  }

  error(item: any): void {
    console.error(item);
  }
}
