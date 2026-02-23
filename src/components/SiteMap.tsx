import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Star } from '@phosphor-icons/react'
import 'leaflet/dist/leaflet.css'

interface SiteMapProps {
  sites: Site[]
  visitedSites: string[]
  onToggleVisit: (siteId: string) => void
}

const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const GUADELOUPE_CENTER: [number, number] = [16.2, -61.55]
const DEFAULT_ZOOM = 10

export function SiteMap({ sites, visitedSites, onToggleVisit }: SiteMapProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm" style={{ height: '70vh' }}>
      <MapContainer
        center={GUADELOUPE_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map((site) => {
          const isVisited = visitedSites.includes(site.id)
          return (
            <Marker
              key={site.id}
              position={[site.coordinates.lat, site.coordinates.lng]}
              icon={defaultIcon}
            >
              <Popup minWidth={220} maxWidth={280}>
                <div className="space-y-2">
                  <div className="font-semibold text-base leading-tight">{site.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="uppercase tracking-wide">{site.category}</span>
                    <span className="flex items-center gap-0.5">
                      <Star weight="fill" className="w-3 h-3 text-yellow-500" />
                      {site.rating}
                    </span>
                  </div>
                  <p className="text-sm leading-snug">{site.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <Badge variant={isVisited ? 'default' : 'secondary'}>
                      {isVisited ? '✓ Visited' : 'Not visited'}
                    </Badge>
                    <button
                      onClick={() => onToggleVisit(site.id)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {isVisited ? 'Unmark' : 'Mark visited'}
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
