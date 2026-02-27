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
  coordinates: { lat: number; lng: number }
}

/** id is optional on create – the server will generate one if omitted. */
export type CreateSiteInput = Omit<Site, 'id'> & { id?: string }
export type UpdateSiteInput = Partial<Omit<Site, 'id'>>
