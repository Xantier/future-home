import { getConfig } from './configReader'
import { GoogleMapsApiClient } from './GoogleMapsApiClient'

export const gradeHomes = async (homeAddress: string): Promise<void> => {
  const config = getConfig()
  if (!config) {
    throw new Error('Failed to load configuration')
  }
  const gmapsClient = new GoogleMapsApiClient()

  const directions = await Promise.all(
    config.interests.map(async (interest) => {
      const distanceInfos = await gmapsClient.getDistanceInfos(
        homeAddress,
        interest.address
      )

      return { interest, distanceInfos }
    })
  )

  console.info(JSON.stringify(directions, null, 2))
}
