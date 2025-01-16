export interface Logger {
  log(item: any): void;
  debug(item: any): void;
  info(item: any): void;
  warn(item: any): void;
  error(item: any): void;
}
