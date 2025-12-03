import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle, MapPin } from '@phosphor-icons/react'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapViewProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
  userLocation?: { lat: number; lng: number } | null
}

// Custom marker icons for visited and unvisited sites
const createCustomIcon = (isVisited: boolean, popularity: Site['popularity']) => {
  const color = isVisited ? '#10b981' : 
                popularity === 'must-see' ? '#ef4444' :
                popularity === 'popular' ? '#f59e0b' :
                '#3b82f6'
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
      ${isVisited ? '<svg style="width: 18px; height: 18px; color: white;" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>' : ''}
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })
}

// Component to handle map centering
function MapCenter({ center }: { center: [number, number] }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  
  return null
}

// Component to handle geolocation
function GeolocationMarker({ location }: { location: { lat: number; lng: number } }) {
  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); animation: pulse 2s infinite;"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  })
  
  return (
    <Marker position={[location.lat, location.lng]} icon={userIcon}>
      <Popup>
        <div className="text-sm font-medium">Your Location</div>
      </Popup>
    </Marker>
  )
}

export function MapView({ sites, visitedSites, onToggleVisit, userLocation }: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([50.9375, 6.9603])
  const mapRef = useRef<L.Map | null>(null)
  
  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng])
    }
  }, [userLocation])

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
    <div className="w-full h-[calc(100vh-280px)] min-h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={13}
        className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenter center={mapCenter} />
        
        {userLocation && <GeolocationMarker location={userLocation} />}
        
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          const popularityConfig = getPopularityConfig(site.popularity)
          const PopularityIcon = popularityConfig.icon
          
          return (
            <Marker
              key={site.id}
              position={[site.coordinates.lat, site.coordinates.lng]}
              icon={createCustomIcon(isVisited, site.popularity)}
            >
              <Popup maxWidth={300} minWidth={250}>
                <div className="space-y-3 p-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-base leading-tight">{site.name}</h3>
                    {isVisited && (
                      <CheckCircle weight="fill" className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
                      <Users weight="fill" className="w-3 h-3 mr-1" />
                      {site.crowdLevel}
                    </Badge>
                    <Badge variant={popularityConfig.variant} className="text-xs">
                      <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
                      {popularityConfig.label}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-foreground/80 line-clamp-3">
                    {site.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock weight="bold" className="w-4 h-4" />
                        <span>{site.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star weight="fill" className="w-4 h-4 text-accent" />
                        <span>{site.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleVisit(site.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        isVisited
                          ? 'bg-primary/20 text-primary hover:bg-primary/30'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {isVisited ? 'Visited' : 'Mark Visited'}
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
      
      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
          }
        }
      `}</style>
    </div>
  )
}
