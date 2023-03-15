import { consoleOutput, DEBUG, fileOutput, Logger } from "../src";


 const logger:Logger = new Logger({
    active: true,
    //filter: (event) => { return event.context && event.context.tag === 'cron' },
    level: DEBUG,
    name: "main",
    outputs: [
      fileOutput({path:"test/out.log"}),
      consoleOutput()
    ],
  });
logger.info("start")
logger.error(new Error())
logger.info("end", {logger})
//expect(result.isCalled).toBe(true);
