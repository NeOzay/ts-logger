import { DEBUG, Logger } from "../src";

const createLogger = () => {
  const result: {
    logger?: Logger
    isCalled: boolean
  } = {
    isCalled: false
  };
  result.logger = new Logger({
    active: true,
    //filter: (event) => { return event.context && event.context.tag === 'cron' },
    level: DEBUG,
    outputs: [
      () => { result.isCalled = true; },
      (e) => { console.log(e.message) }
    ],
  });
  return <Required<typeof result>>result;
};
const result = createLogger();
const { logger } = result;
logger.info('Executed cron jobs', { tag: 'cron' });
console.log(result.isCalled)
//expect(result.isCalled).toBe(true);
