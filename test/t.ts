import { consoleOutput, DEBUG, ERROR, FATAL, fileOutput, Logger } from "../src";


 const logger:Logger = new Logger({
    active: true,
    //filter: (event) => { return event.context && event.context.tag === 'cron' },
    level: FATAL,
    name: "main",
    outputs: [
      consoleOutput()
    ],
  });
logger.error(new Error())
//expect(result.isCalled).toBe(true);
