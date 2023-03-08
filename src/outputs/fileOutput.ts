import { LoggerEvent } from "../struct";
import { defaultFormatter } from "../util";

import fs from "node:fs"
import path from "node:path"

function fileOutput(options:{ formatter?: (event: LoggerEvent) => string, path:string}): ((arg0: LoggerEvent) => void){
  const opts = { formatter: defaultFormatter, ...options };
  const {formatter} = opts
  const _path = opts.path
  const fullPath = path.resolve(_path)
  return function (event) {
    const output = formatter(event)+"\n"
    fs.appendFile(fullPath, output, function(err) {
      if (err) throw err
    })
  }
}

export default fileOutput
