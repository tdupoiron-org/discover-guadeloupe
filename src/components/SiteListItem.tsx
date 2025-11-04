import { Site } from '@/types/site'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SiteListItemProps {
  site: Site
  isVisited: boolean
  onToggleVisit: (siteId: string) => void
}

export function SiteListItem({ site, isVisited, onToggleVisit }: SiteListItemProps) {
  const getCrowdBadgeVariant = (level: Site['crowdLevel']) => {
    switch (level) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'outline'
    }
  }

  const getPopularityConfig = (popularity: Site['popularity']) => {
    switch (popularity) {
      case 'must-see':
        return { icon: Sparkle, label: 'Must-See', color: 'text-accent' }
      case 'popular':
        return { icon: Fire, label: 'Popular', color: 'text-orange-500' }
      case 'hidden-gem':
        return { icon: Star, label: 'Hidden Gem', color: 'text-primary' }
    }
  }

  const popularityConfig = getPopularityConfig(site.popularity)
  const PopularityIcon = popularityConfig.icon

  return (
    <div 
      className={cn(
        "group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg",
        isVisited && "opacity-60"
      )}
    >
      <div className="flex gap-4 p-4">
        {/* Image Section */}
        <div className="relative w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
          <img 
            src={site.image} 
            alt={site.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {isVisited && (
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
              <div className="bg-white/95 rounded-full p-2 shadow-lg">
                <CheckCircle weight="fill" className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white">
            <Star weight="fill" className="w-3 h-3 text-accent" />
            <span className="font-semibold text-xs">{site.rating}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg leading-tight mb-1">
                  {site.name}
                </h3>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {site.category}
                </p>
              </div>
              <button
                onClick={() => onToggleVisit(site.id)}
                className="flex-shrink-0 hover:scale-110 transition-transform"
                aria-label={isVisited ? 'Mark as not visited' : 'Mark as visited'}
              >
                <Checkbox 
                  checked={isVisited}
                  className="w-6 h-6"
                />
              </button>
            </div>

            <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
              {site.description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock weight="bold" className="w-4 h-4" />
              <span>{site.duration}</span>
            </div>
            
            <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="text-xs">
              <Users weight="fill" className="w-3 h-3 mr-1" />
              {site.crowdLevel}
            </Badge>

            <Badge className={cn("text-xs", popularityConfig.color)}>
              <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
              {popularityConfig.label}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
