import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle, MapPin } from '@phosphor-icons/react'

interface MapViewProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
}

// Component to handle map centering with geolocation
function LocationMarker({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap()

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 11, { animate: true })
    }
  }, [userLocation, map])

  if (!userLocation) return null

  const userIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI4IiBmaWxsPSIjM2I4MmY2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  return <Marker position={userLocation} icon={userIcon} />
}

export function MapView({ sites, visitedSites, onToggleVisit }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  // Request user location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.log('Geolocation error:', error.message)
        }
      )
    }
  }, [])

  // Center of Guadeloupe
  const defaultCenter: [number, number] = [16.2, -61.5]
  const initialCenter = userLocation || defaultCenter

  // Memoize marker icon creation to avoid recreating on every render
  const createMarkerIcon = useMemo(() => {
    return (isVisited: boolean, popularity: Site['popularity']) => {
      const color = isVisited ? '#9ca3af' : popularity === 'must-see' ? '#ef4444' : popularity === 'popular' ? '#f59e0b' : '#10b981'
      
      return new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 42 16 42C16 42 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="${color}"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `)}`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      })
    }
  }, [])

  const getCrowdBadgeVariant = (level: Site['crowdLevel']) => {
    switch (level) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'accent'
    }
  }

  const getPopularityConfig = (popularity: Site['popularity']) => {
    switch (popularity) {
      case 'must-see':
        return { icon: Sparkle, label: 'Must-See', variant: 'cologne' as const }
      case 'popular':
        return { icon: Fire, label: 'Popular', variant: 'destructive' as const }
      case 'hidden-gem':
        return { icon: Star, label: 'Hidden Gem', variant: 'default' as const }
    }
  }

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] md:h-[calc(100vh-16rem)] rounded-xl overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={initialCenter}
        zoom={10}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <LocationMarker userLocation={userLocation} />
        
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          const popularityConfig = getPopularityConfig(site.popularity)
          const PopularityIcon = popularityConfig.icon

          return (
            <Marker
              key={site.id}
              position={[site.coordinates.lat, site.coordinates.lng]}
              icon={createMarkerIcon(isVisited, site.popularity)}
            >
              <Popup maxWidth={480} className="site-popup">
                <div className="flex gap-3 p-2">
                  <div className="relative w-40 min-h-[140px] flex-shrink-0 overflow-hidden rounded-lg -ml-2 -my-2">
                    <img 
                      src={site.image} 
                      alt={site.name}
                      className="w-full h-full object-cover"
                    />
                    {isVisited && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-white/95 rounded-full p-1.5 shadow-lg">
                          <CheckCircle weight="fill" className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight mb-0.5">
                          {site.name}
                        </h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {site.category}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleVisit(site.id)
                        }}
                        className="flex-shrink-0 hover:scale-110 transition-transform"
                        aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
                      >
                        <Checkbox 
                          checked={isVisited}
                          className="w-4 h-4"
                        />
                      </button>
                    </div>

                    <p className="text-xs text-foreground/80 line-clamp-2">
                      {site.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
                        <Users weight="fill" className="w-3 h-3 mr-1" />
                        {site.crowdLevel}
                      </Badge>
                      <Badge variant={popularityConfig.variant} className="text-xs">
                        <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
                        {popularityConfig.label}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock weight="bold" className="w-3.5 h-3.5" />
                        <span className="text-xs">{site.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star weight="fill" className="w-3.5 h-3.5 text-accent" />
                        <span className="text-xs font-semibold">{site.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {userLocation && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <MapPin weight="fill" className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">Your Location</span>
          </div>
        </div>
      )}
    </div>
  )
}
