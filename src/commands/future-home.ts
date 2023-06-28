import { GluegunCommand } from 'gluegun'
import { gradeHomes } from '../lib/distances'

const command: GluegunCommand = {
  name: 'future-home',
  run: async (toolbox) => {
    const { print } = toolbox
    const homeAddress = toolbox.parameters.string
    print.info(
      `Checking distances from ${homeAddress} to configured interests.`
    )

    await gradeHomes(homeAddress)
  },
}

module.exports = command
