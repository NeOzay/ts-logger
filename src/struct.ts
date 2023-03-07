import Levels from "./levels"

export interface LoggerOptions {
  active: true
  defaultContext: object | null
  filter: ((event: LoggerEvent) => boolean) | null
  level: Levels
  name: null
  outputs: ((event: LoggerEvent) => void)[]
};

export interface LoggerEvent {
  context?: LoggerContext
  level: Levels
  logger: string
  message: string
  timestamp: number
}

export interface errorDetails {
  message: string
  name: string
  reason: string
  stack: string
  type: string
}

export interface LoggerContext {
  [key: string]: any
}