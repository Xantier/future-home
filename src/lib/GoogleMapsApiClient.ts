import fetch from 'cross-fetch'

type Coordinate = {
  latLng: {
    latitude: number
    longitude: number
  }
}

type TravelMode =
  | 'TRAVEL_MODE_UNSPECIFIED'
  | 'DRIVE'
  | 'BICYCLE'
  | 'WALK'
  | 'TWO_WHEELER'

type RouteRequest = {
  travelMode: TravelMode
  origin: { location: Coordinate } | { address: string }
  destination: { location: Coordinate } | { address: string }
}

type Route = { distanceMeters: number; duration: string }

type DistanceInfos = {
  distanceInfos: { travelMode: TravelMode; info: Route }[]
  origin: string
  destination: string
}

const INTERESTING_TRAVEL_MODES = ['BICYCLE', 'DRIVE', 'WALK']

export class GoogleMapsApiClient {
  private readonly apiKey: string

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY
  }

  private async callEndpoint(
    request: RouteRequest,
    url = 'https://routes.googleapis.com/directions/v2:computeRoutes'
  ) {
    try {
      const body = JSON.stringify(request)
      const response = await fetch(url, {
        body,
        method: 'POST',
        headers: {
          'X-Goog-Api-Key': this.apiKey,
          'X-Goog-FieldMask': `routes.duration,routes.distanceMeters`,
        },
      })
      if (response.ok) {
        return await response.json()
      }
      console.error(await response.text())
      return 'Failed'
    } catch (e) {
      console.error('Failed to get route', e.message)
    }
  }

  async getDistanceInfos(
    origin: string,
    destination: string
  ): Promise<DistanceInfos> {
    const params: Omit<RouteRequest, 'travelMode'> = {
      origin: { address: origin },
      destination: { address: destination },
    }

    const distanceInfos = await Promise.all(
      INTERESTING_TRAVEL_MODES.map(async (travelMode: TravelMode) => {
        const response = await this.callEndpoint({ ...params, travelMode })
        return { travelMode, info: response.routes[0] }
      })
    )

    return { origin, destination, distanceInfos }
  }
}
