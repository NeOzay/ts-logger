import Levels from "./levels"

type filter = (event:LoggerEvent)=>(boolean|null|undefined)
export interface LoggerOptions {
  active: boolean
  defaultContext?: LoggerContext|null
  filter: filter|null
  level: Levels
  name: string|null
  outputs: ((event: LoggerEvent) => void)[]
};

export interface LoggerEvent {
  context?: LoggerContext|null
  level: Levels
  logger: string
  message: string
  timestamp: number
}

export interface errorDetails {
  message?: string
  name?: string
  stack?: string
}

export interface LoggerContext {
  [key: string|number|symbol]: any
}
