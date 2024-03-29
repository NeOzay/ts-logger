/*
 * The MIT License (MIT)
 * Copyright (c) 2022 Karl STEIN
 */

import {
	describe,
	expect,
	it,
} from '@jest/globals';
import {
	DEBUG,
	ERROR,
	FATAL,
	INFO,
	WARN,
} from '../src';
import Logger from '../src/Logger'
import { LoggerContext, LoggerEvent } from '../src/struct';

describe('Logger', () => {
	it('should be importable from package', () => {
		expect(typeof Logger).toBe('function');
	});
});

describe('new Logger(options)', () => {
	describe('with options.active', () => {
		describe('with options.active = true', () => {
			it('should create an active logger', () => {
				const logger = new Logger({ active: true });
				expect(logger.isActive()).toBe(true);
			});
		});
		describe('with options.active = false', () => {
			it('should create an inactive logger', () => {
				const logger = new Logger({ active: false });
				expect(logger.isActive()).toBe(false);
			});
		});
		describe('with options.active = undefined', () => {
			it('should create an active logger', () => {
				const logger = new Logger({});
				expect(logger.isActive()).toBe(true);
			});
		});
	});

	describe('with options.defaultContext', () => {
		describe('with options.defaultContext = object', () => {
			const createLoggerWithDefaultContext = () => {
        let ctx:LoggerContext = {}
        const defaultContext = { num: 42 }
				const logger = new Logger({
					active: true,
					defaultContext: defaultContext,
					outputs: [(event) => {
					  result.ctx = event.context!;
					}],
				});
        const result = {
          logger,
          ctx,
          defaultContext
        };
				return result;
			};

			it('should create a logger with the given default context', () => {
				const { defaultContext, logger } = createLoggerWithDefaultContext();
				expect(logger.defaultContext).toBe(defaultContext);
			});

			it('should add the default context to every log event', () => {
				const result = createLoggerWithDefaultContext();
				const { logger, defaultContext } = result;
				logger.info('Hello World');
				expect(result.ctx).not.toBeNull();
				expect(result.ctx.num).toBe(defaultContext.num);
			});
		});
	});

	describe('with options.filter', () => {
		describe('with options.filter = function', () => {
			const createLogger = () => {
				 const logger = new Logger({
					active: true,
					filter: (event) => {return event.context && event.context.tag === 'cron'},
					level: DEBUG,
					outputs: [
						() => { result.isCalled = true; },
					],
				});
        const result = {
          logger,
          isCalled: false
        }
				return result
			};
			it('should create a logger with the filter', () => {
				const result = createLogger();
				const { logger } = result;
				logger.info('Executed cron jobs', { tag: 'cron' });
				expect(result.isCalled).toBe(true);
			});
			it('should create a logger with the filter', () => {
				const result = createLogger();
				const { logger } = result;
				logger.info('Application started');
				expect(result.isCalled).toBe(false);
			});
		});
	});

	describe('with options.level', () => {
		describe('with options.level = string', () => {
			it('should create a logger with the given log level', () => {
				const level = ERROR;
				const logger = new Logger({ level });
				expect(logger.getLevel()).toBe(level);
			});
		});
		describe('with options.level = INFO', () => {
			it('should not log messages under INFO level', () => {
				const message = 'hello world';
				let isCalled = false;
				const logger = new Logger({
					active: true,
					level: INFO,
					outputs: [() => { isCalled = true; }],
				});
				logger.debug(message);
				expect(isCalled).toBe(false);
			});
		});
		describe('with options.level = WARN', () => {
			it('should not log messages under WARN level', () => {
				const message = 'hello world';
				let isCalled = false;
				const logger = new Logger({
					active: true,
					level: WARN,
					outputs: [() => { isCalled = true; }],
				});
				logger.debug(message);
				logger.info(message);
				expect(isCalled).toBe(false);
			});
		});
		describe('with options.level = ERROR', () => {
			it('should not log messages under ERROR level', () => {
				const message = 'hello world';
				let isCalled = false;
				const logger = new Logger({
					active: true,
					level: ERROR,
					outputs: [() => { isCalled = true; }],
				});
				logger.debug(message);
				logger.info(message);
				logger.warn(message);
				expect(isCalled).toBe(false);
			});
		});
		describe('with options.level = FATAL', () => {
			it('should not log messages under FATAL level', () => {
				const message = 'hello world';
				let isCalled = false;
				const logger = new Logger({
					active: true,
					level: FATAL,
					outputs: [() => { isCalled = true; }],
				});
				logger.debug(message);
				logger.info(message);
				logger.warn(message);
				logger.error(message);
				expect(isCalled).toBe(false);
			});
		});
	});

	describe('with options.name', () => {
		describe('with options.name = string', () => {
			it('should create a logger with the given name', () => {
				const name = 'main';
				const logger = new Logger({ name });
				expect(logger.getName()).toBe(name);
			});
		});
		describe('with options.name = undefined', () => {
			it('should create a logger with a generated name', () => {
				const logger = new Logger({});
				expect(typeof logger.getName()).toBe('string');
				expect(logger.getName().length > 0).toBe(true);
			});
		});
	});

	describe('with options.outputs', () => {
		describe('with options.outputs = undefined', () => {
			it('should not throw an error', () => {
				let logger:Logger;
				expect(() => { logger = new Logger({}); }).not.toThrow();
				expect(logger!).toBeDefined();
			});
		});
		describe('with options.outputs = []', () => {
			it('should throw an error', () => {
				let logger:Logger;
				expect(() => { logger = new Logger({ outputs: [] }); }).toThrow();
				expect(logger!).toBeUndefined();
			});
		});
	});

	describe('debug(string, object)', () => {
		it('should log a debug message', () => {
			let logEvent!:LoggerEvent;
			const message = 'Hello World';
			const logger = new Logger({
				active: true,
				level: DEBUG,
				outputs: [(event) => { logEvent = event; }],
			});
			logger.debug(message);
			expect(logEvent).not.toBeNull();
			expect(logEvent.level).toBe(DEBUG);
			expect(logEvent.message).toBe(message);
		});
	});

	describe('error(string, object)', () => {
		it('should log an error message', () => {
      let logEvent!:LoggerEvent;
			const message = 'Something failed';
			const logger = new Logger({
				active: true,
				level: ERROR,
				outputs: [(event) => { logEvent = event; }],
			});
			logger.error(message);
			expect(logEvent).not.toBeNull();
			expect(logEvent.level).toBe(ERROR);
			expect(logEvent.message).toBe(message);
		});
	});

	describe('error(Error)', () => {
		it('should log an error', () => {
			let event!:LoggerEvent;
			const logger = new Logger({
				active: true,
				//level: ERROR,
				outputs: [(ev) => { event = ev; }],
			});
			const error = new Error('Something failed');
			logger.error(error);
			expect(event).not.toBeNull();
			expect(event.level).toBe(ERROR);
			expect(event.message).toBe(error.stack);
		});
	});

	describe('fatal(string, object)', () => {
		it('should log a fatal error message', () => {
      let logEvent!:LoggerEvent;
			const message = 'Something failed';
			const logger = new Logger({
				active: true,
				level: FATAL,
				outputs: [(event) => { logEvent = event; }],
			});
			logger.fatal(message);
			expect(logEvent).not.toBeNull();
			expect(logEvent.level).toBe(FATAL);
			expect(logEvent.message).toBe(message);
		});
	});

	describe('fatal(Error)', () => {
		it('should log an error', () => {
      let event!:LoggerEvent;
			const logger = new Logger({
				active: true,
				level: FATAL,
				outputs: [(ev) => { event = ev; }],
			});
			const error = new Error('Fatal error');
			logger.fatal(error);
			expect(event).not.toBeNull();
			expect(event.level).toBe(FATAL);
			expect(event.message).toBe(error.stack);
		});
	});

	describe('info(string, object)', () => {
		it('should log an informational message', () => {
      let logEvent!:LoggerEvent;
			const message = 'Sky is blue';
			const logger = new Logger({
				active: true,
				level: INFO,
				outputs: [(event) => { logEvent = event; }],
			});
			logger.info(message);
			expect(logEvent).not.toBeNull();
			expect(logEvent.level).toBe(INFO);
			expect(logEvent.message).toBe(message);
		});
	});

	describe('isActive()', () => {
		it('should return true if the logger is active', () => {
			const logger = new Logger({ active: true });
			expect(logger.isActive()).toBe(true);
		});
		it('should return true if the logger is not active', () => {
			const logger = new Logger({ active: false });
			expect(logger.isActive()).toBe(false);
		});
	});

	describe('log(level: string, message: string, context: ?object)', () => {
    let logEvent!:LoggerEvent;
		const message = 'Sky is blue';
		const context = { color: 'blue' };
		const logger = new Logger({
			active: true,
			level: INFO,
			outputs: [(event) => { logEvent = event; }],
		});
		logger.log(INFO, message, context);

		describe(`with level = "${INFO}"`, () => {
			it('should log the message with level', () => {
				expect(logEvent.level).toBe(INFO);
			});
		});
		describe(`with message = "${message}"`, () => {
			it('should log the message', () => {
				expect(logEvent.message).toBe(message);
			});
		});
		describe(`with context = "${context}"`, () => {
			it('should log the message with context', () => {
				expect(logEvent.context).toBe(context);
			});
		});
	});

	describe('setActive(boolean)', () => {
		describe('setActive(true)', () => {
			it('should enable the logger', () => {
				const logger = new Logger({ active: false });
				logger.setActive(true);
				expect(logger.isActive()).toBe(true);
			});
		});
		describe('setActive(false)', () => {
			it('should disable the logger', () => {
				const logger = new Logger({ active: true });
				logger.setActive(false);
				expect(logger.isActive()).toBe(false);
			});
		});
	});

	describe('setLevel(int)', () => {
		describe('setLevel(ERROR)', () => {
			it('should set the level to ERROR', () => {
				const logger = new Logger({ active: false, level: INFO });
				logger.setLevel(ERROR);
				expect(logger.getLevel()).toBe(ERROR);
			});
		});
	});

	describe('warn(string, object)', () => {
		it('should log a warning message', () => {
      let logEvent!:LoggerEvent;
			const message = 'Something happened';
			const logger = new Logger({
				active: true,
				level: WARN,
				outputs: [(event) => { logEvent = event; }],
			});
			logger.warn(message);
			expect(logEvent).not.toBeNull();
			expect(logEvent.level).toBe(WARN);
			expect(logEvent.message).toBe(message);
		});
	});
});
