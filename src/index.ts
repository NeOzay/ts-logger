import levels, {
  DEBUG,
  ERROR,
  FATAL,
  INFO,
  WARN,
} from './levels';
import Logger from './Logger';
import consoleOutput from './outputs/consoleOutput';
import fileOutput from './outputs/fileOutput'

export {
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
  levels,
  consoleOutput,
  fileOutput,
  Logger,
};
