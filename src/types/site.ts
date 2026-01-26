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
}
