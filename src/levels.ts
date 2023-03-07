enum Levels {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}
export const DEBUG = Levels.DEBUG
export const INFO = Levels.INFO
export const WARN = Levels.WARN
export const ERROR = Levels.ERROR
export const FATAL = Levels.FATAL

export function levelToString(level: Levels): "DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL" {
  switch (level) {
    case DEBUG:
      return "DEBUG"
    case INFO:
      return "INFO"
    case WARN:
      return "WARN"
    case ERROR:
      return "ERROR"
    case FATAL:
      return "FATAL"
  }
}

export default Levels
