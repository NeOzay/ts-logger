
import {
  describe,
  expect,
  it,
} from '@jest/globals';
import {
  DEBUG,
  Logger,
} from '../src';
import consoleOutput from '../src/outputs/consoleOutput';
import { LoggerContext, LoggerEvent } from '../src/struct';

function createPayload() {
  return {
    message: 'This is a message',
    context: { number: Math.random() },
  };
}

describe('new Logger({ outputs: [ consoleOutput() ] })', () => {
  const entries:string[] = [];
  const formatter:(option: Partial<LoggerEvent>)=>string = ({ message, context }) => JSON.stringify({ message, context });

  const output = consoleOutput({
    entries,
    formatter,
  });

  const logger = new Logger({
    active: true,
    level: DEBUG,
    name: 'main',
    outputs: [output],
  });

  describe('logger.debug(string, string)', () => {
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.debug(message, context);
      expect(entries.pop()).toBe(formatter(payload));
    });
  });

  describe('logger.error(string, string)', () => {
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.error(message, context);
      expect(entries.pop()).toBe(formatter(payload));
    });
  });

  describe('logger.fatal(string, string)', () => {
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.fatal(message, context);
      expect(entries.pop()).toBe(formatter(payload));
    });
  });

  describe('logger.info(string, string)', () => {
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.info(message, context);
      expect(entries.pop()).toBe(formatter(payload));
    });
  });

  describe('logger.warn(string, string)', () => {
    it('should send event to console', () => {
      const payload = createPayload();
      const { message, context } = payload;
      logger.warn(message, context);
      expect(entries.pop()).toBe(formatter(payload));
    });
  });
});
