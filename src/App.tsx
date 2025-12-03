import { useState, useEffect } from 'react'
import { kolnSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { MapView } from '@/components/MapView'
import { ViewSwitcher } from '@/components/ViewSwitcher'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle, Crosshair } from '@phosphor-icons/react'

function App() {
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  useEffect(() => {
    // Try to get user's location when map view is activated
    if (viewMode === 'map' && !userLocation && !locationError) {
      requestUserLocation()
    }
  }, [viewMode])

  const requestUserLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoadingLocation(true)
      setLocationError(null)
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError('Unable to get your location')
          setIsLoadingLocation(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    } else {
      setLocationError('Geolocation is not supported by your browser')
    }
  }

  const filteredSites = kolnSites.filter(site => {
    if (filter === 'visited') return visited.includes(site.id)
    if (filter === 'unvisited') return !visited.includes(site.id)
    return true
  })

  const visitedCount = visited.length
  const totalCount = kolnSites.length
  const progressPercentage = (visitedCount / totalCount) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <MapPin weight="fill" className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Discover Köln
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Welcome to your personal guide for exploring Köln's most captivating sites. 
            Track your journey through this magnificent city.
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
              
              <div className="flex-grow" />
              
              {viewMode === 'map' && (
                <button
                  onClick={requestUserLocation}
                  disabled={isLoadingLocation}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    userLocation
                      ? 'bg-primary/20 text-primary hover:bg-primary/30'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  } disabled:opacity-50`}
                  title="Center map on your location"
                >
                  <Crosshair weight="bold" className="inline w-4 h-4 mr-1.5" />
                  {isLoadingLocation ? 'Locating...' : userLocation ? 'Update Location' : 'Use My Location'}
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                All Sites ({totalCount})
              </button>
              <button
                onClick={() => setFilter('unvisited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'unvisited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                To Visit ({totalCount - visitedCount})
              </button>
              <button
                onClick={() => setFilter('visited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'visited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <CheckCircle weight="fill" className="inline w-4 h-4 mr-1.5" />
                Visited ({visitedCount})
              </button>
            </div>

            {visitedCount > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Your Progress</span>
                  <Badge variant="secondary">
                    {visitedCount} of {totalCount}
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
          </div>
        </header>

        {viewMode === 'map' ? (
          <MapView
            sites={filteredSites}
            visitedSites={visited}
            onToggleVisit={toggleVisit}
            userLocation={userLocation}
          />
        ) : filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {filter === 'visited' && visitedCount === 0
                ? 'Start exploring Köln and mark your first site! ✨'
                : filter === 'visited' && visitedCount === totalCount
                ? '🎉 Congratulations! You\'ve visited all the sites!'
                : 'No sites match your filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <SiteCard
                key={site.id}
                site={site}
                isVisited={visited.includes(site.id)}
                onToggleVisit={toggleVisit}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer - Fußzeile */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Discover Köln. Made with ❤️ for travelers.
            {/* Mit Liebe für Reisende gemacht */}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App