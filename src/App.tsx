import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { kolnSites } from '@/data/sites'
import { SiteCard } from '@/components/SiteCard'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MapPin, CheckCircle } from '@phosphor-icons/react'
import ListView from '@/components/ListView'
import { LanguageSelector } from '@/components/LanguageSelector'

function App() {
  const { t } = useTranslation()
  const [visitedSites, setVisitedSites] = useState<string[]>([])
  const [filter, setFilter] = useState<'all' | 'visited' | 'unvisited'>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const visited = visitedSites

  const toggleVisit = (siteId: string) => {
    setVisitedSites((current) => {
      if (current.includes(siteId)) {
        return current.filter(id => id !== siteId)
      }
      return [...current, siteId]
    })
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
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <MapPin weight="fill" className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('app.title')}
              </h1>
            </div>
            <LanguageSelector />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            {t('app.subtitle')}
          </p>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {t('filters.all')} ({totalCount})
              </button>
              <button
                onClick={() => setFilter('unvisited')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'unvisited'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {t('filters.toVisit')} ({totalCount - visitedCount})
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
                {t('filters.visited')} ({visitedCount})
              </button>
            </div>

            {/* Sliding Switcher for Grid/List View */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">{t('view.label')}</span>
              <div className="flex bg-secondary rounded-md overflow-hidden">
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                    view === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                >
                  {t('view.grid')}
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                    view === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                >
                  {t('view.list')}
                </button>
              </div>
            </div>

            {visitedCount > 0 && (
              <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{t('progress.title')}</span>
                  <Badge variant="secondary">
                    {visitedCount} {t('progress.of')} {totalCount}
                  </Badge>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
          </div>
        </header>

        {filteredSites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              {filter === 'visited' && visitedCount === 0
                ? t('emptyState.startExploring')
                : filter === 'visited' && visitedCount === totalCount
                ? t('emptyState.congratulations')
                : t('emptyState.noMatch')}
            </p>
          </div>
        ) : (
          view === 'grid' ? (
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
          ) : (
            <ListView sites={filteredSites} />
          )
        )}
      </div>
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 md:px-8">
          <p className="text-center text-sm text-muted-foreground">
            {t('app.footer')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App