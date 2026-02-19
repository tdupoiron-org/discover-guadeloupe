// Main App component for Guadeloupe discovery / Hauptkomponente für die Entdeckung von Guadeloupe
import { useState } from 'react'
import { useSites } from '@/hooks/use-sites'
import { SiteCard } from '@/components/SiteCard'
import { MapView } from '@/components/MapView'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle, SquaresFour, MapTrifold } from '@phosphor-icons/react'
import { useSiteRatings } from '@/hooks/use-site-ratings'
import { CreateSiteDialog } from '@/components/CreateSiteDialog'
import { Toaster, toast } from 'sonner'
import type { Site } from '@/types/site'

function App() {
  const { sites, isLoading, isError, createSite, updateSite, deleteSite } = useSites()
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const { getRating, setRating } = useSiteRatings()

  const visited = visitedSites

  // Toggle visit status for a site / Besuchsstatus für eine Sehenswürdigkeit umschalten
  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
  }

  // Handle rating change
  const handleRatingChange = (siteId: string, rating: number) => {
    setRating(siteId, rating)
  }

  const handleCreateSite = async (data: Omit<Site, 'id'>) => {
    try {
      await createSite(data)
      toast.success('Site created successfully!')
    } catch {
      toast.error('Failed to create site')
    }
  }

  const handleEditSite = async (id: string, data: Partial<Site>) => {
    try {
      await updateSite({ id, data })
      toast.success('Site updated successfully!')
    } catch {
      toast.error('Failed to update site')
    }
  }

  const handleDeleteSite = async (id: string) => {
    try {
      await deleteSite(id)
      toast.success('Site deleted successfully!')
    } catch {
      toast.error('Failed to delete site')
    }
  }

  // Filter sites based on visit status / Sehenswürdigkeiten nach Besuchsstatus filtern
  const filteredSites = sites.filter(site => {
    if (filter === 'visited') return visited.includes(site.id)
    if (filter === 'unvisited') return !visited.includes(site.id)
    return true
  })

  // Calculate visit progress / Besuchsfortschritt berechnen
  const visitedCount = visited.length
  const totalCount = sites.length
  const progressPercentage = (visitedCount / totalCount) * 100

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading sites…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-destructive">Failed to load sites. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <MapPin weight="fill" className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Discover Guadeloupe
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Welcome to your personal guide for exploring Guadeloupe's most captivating sites. 
            Track your journey through this beautiful Caribbean paradise.
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2 p-1 bg-secondary rounded-full">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <SquaresFour weight="fill" className="inline w-4 h-4 mr-1.5" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    viewMode === 'map'
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <MapTrifold weight="fill" className="inline w-4 h-4 mr-1.5" />
                  Map
                </button>
              </div>

              <CreateSiteDialog onCreate={handleCreateSite} />

              <div className="h-8 w-px bg-border" />

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
            visitedSites={visitedSites}
            onToggleVisit={toggleVisit}
          />
        ) : filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {filter === 'visited' && visitedCount === 0
                ? 'Start exploring Guadeloupe and mark your first site! ✨'
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
                userRating={getRating(site.id)}
                onRatingChange={handleRatingChange}
                onEdit={handleEditSite}
                onDelete={handleDeleteSite}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer - Fußzeile */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Discover Guadeloupe. Made with ❤️ for travelers by{' '}
            <a 
              href="https://github.com/tdupoiron" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              tdupoiron
            </a>
            {/* Mit Liebe für Reisende gemacht */}
          </p>
        </div>
      </footer>
      <Toaster richColors />
    </div>
  )
}

export default App