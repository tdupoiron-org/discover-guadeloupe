export interface Site {
  id: string
  name: string
  description: string
  image: string
  duration: string
  crowdLevel: 'low' | 'medium' | 'high'
  rating: number
  popularity: 'must-see' | 'popular' | 'hidden-gem'
  category: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface SiteRating {
  siteId: string
  rating: number // 1-5 stars
}
