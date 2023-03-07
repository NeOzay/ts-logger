import Levels from "./levels"

export interface LoggerOptions  {
  active: true,
  defaultContext: null,
  filter: null,
  level: Levels,
  name: null,
  outputs: ((event:LoggerEvent)=>void)[],
};

export interface LoggerEvent {
  context: unknown
  level: Levels
  logger: string
  message: string
  timestamp: number
}
