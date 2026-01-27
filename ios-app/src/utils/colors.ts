import { Site } from '../types/site'

export const getCrowdColor = (level: Site['crowdLevel'], colors: any) => {
  switch (level) {
    case 'high': return colors.destructive
    case 'medium': return colors.warning
    case 'low': return colors.success
  }
}

export const getMarkerColor = (site: Site, isVisited: boolean) => {
  if (isVisited) return '#9ca3af'
  switch (site.popularity) {
    case 'must-see': return '#ef4444'
    case 'popular': return '#f59e0b'
    case 'hidden-gem': return '#10b981'
  }
}

export const getPopularityEmoji = (popularity: Site['popularity']) => {
  switch (popularity) {
    case 'must-see': return '✨'
    case 'popular': return '🔥'
    case 'hidden-gem': return '💎'
  }
}

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
