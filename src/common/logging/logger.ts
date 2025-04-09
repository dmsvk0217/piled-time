import { ConsoleLogger, Injectable } from "@nestjs/common";

@Injectable()
export class Logger extends ConsoleLogger {
  request(method?: string, url?: string, time?: number) {
    super.log(`Request: [${method}] \"${url}\", After: +${time}ms`);
  }

  response(response: string) {
    super.log(`Response: ${response}...`);
  }

  errors(method?: string, url?: string, time?: number) {
    super.error(`Request: [${method}] \"${url}\", After: +${time}ms`);
  }

  trace(message: any) {
    super.error(message);
  }
}
