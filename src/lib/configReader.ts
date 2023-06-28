import { readFileSync } from 'fs'
import * as path from 'path'

type Interest = {
  name: string
  url: string
  address: string
}
type Configuration = {
  interests: Interest[]
}

export const getConfig = (): Configuration | undefined => {
  const configPath = path.resolve(__dirname, '../..', 'config.json')
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'))
  } catch (e) {
    console.error(
      `Was unable to find a config file. Dump a json blob into ${configPath} and try again`
    )
  }
}
