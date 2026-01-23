import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle } from '@phosphor-icons/react'

// Fix for default marker icon issue in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

interface MapViewProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
}

// Guadeloupe geographic bounds for geolocation validation
const GUADELOUPE_BOUNDS = {
  minLat: 15.5,
  maxLat: 16.8,
  minLng: -62,
  maxLng: -60.8
}

// Default map center (centered on Guadeloupe)
const DEFAULT_MAP_CENTER: [number, number] = [16.2, -61.5]

export function MapView({ sites, visitedSites, onToggleVisit }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_MAP_CENTER)
  
  // Try to get user's geolocation
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Check if user is in/near Guadeloupe
          if (
            latitude >= GUADELOUPE_BOUNDS.minLat && 
            latitude <= GUADELOUPE_BOUNDS.maxLat && 
            longitude >= GUADELOUPE_BOUNDS.minLng && 
            longitude <= GUADELOUPE_BOUNDS.maxLng
          ) {
            setUserLocation([latitude, longitude])
            setMapCenter([latitude, longitude])
          }
        },
        () => {
          // Geolocation denied or unavailable - use default center
        }
      )
    }
  }, [])

  const getPopularityConfig = (popularity: Site['popularity']) => {
    switch (popularity) {
      case 'must-see':
        return { icon: Sparkle, label: 'Must-See', color: 'text-purple-600' }
      case 'popular':
        return { icon: Fire, label: 'Popular', color: 'text-red-600' }
      case 'hidden-gem':
        return { icon: Star, label: 'Hidden Gem', color: 'text-yellow-600' }
    }
  }

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

  // Get color for marker based on visited status and popularity
  const getMarkerColor = (isVisited: boolean, popularity: Site['popularity']): string => {
    if (isVisited) return '#22c55e' // green
    
    switch (popularity) {
      case 'must-see':
        return '#9333ea' // purple
      case 'popular':
        return '#ef4444' // red
      case 'hidden-gem':
        return '#eab308' // yellow
    }
  }

  // Create custom marker icons for visited vs unvisited sites
  const createCustomIcon = (isVisited: boolean, popularity: Site['popularity']) => {
    const color = getMarkerColor(isVisited, popularity)
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${color};
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          border: 3px solid white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.3);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="transform: rotate(45deg); color: white; font-size: 16px;">
            ${isVisited ? '✓' : '📍'}
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [12, 32],
      popupAnchor: [0, -32]
    })
  }

  return (
    <div className="w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={10}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Site markers */}
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
              <Popup maxWidth={300} className="custom-popup">
                <div className="p-2 space-y-2">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover"
                    />
                    {isVisited && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="bg-white/95 rounded-full p-2 shadow-lg">
                          <CheckCircle weight="fill" className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-base mb-1">{site.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase mb-2">{site.category}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
                      <Users weight="fill" className="w-3 h-3 mr-1" />
                      {site.crowdLevel}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${popularityConfig.color}`}>
                      <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
                      {popularityConfig.label}
                    </Badge>
                  </div>

                  <p className="text-sm text-foreground/80 line-clamp-2">{site.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock weight="bold" className="w-3 h-3" />
                        <span>{site.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star weight="fill" className="w-3 h-3 text-accent" />
                        <span className="font-semibold">{site.rating}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onToggleVisit(site.id)}
                      className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                        isVisited
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {isVisited ? 'Visited' : 'Mark as Visited'}
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
