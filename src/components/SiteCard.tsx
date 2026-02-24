import { Site } from '@/types/site'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Clock, Users, Star, Fire, Sparkle, CheckCircle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface SiteCardProps {
  site: Site
  isVisited: boolean
  onToggleVisit: (siteId: string) => void
}

export function SiteCard({ site, isVisited, onToggleVisit }: SiteCardProps) {
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

  const popularityConfig = getPopularityConfig(site.popularity)
  const PopularityIcon = popularityConfig.icon

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        isVisited && "opacity-60"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* ♿ A11Y BUG #1 — Missing alt text: screen readers announce "image" with no context */}
        <img 
          src={site.image} 
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {isVisited && (
          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
            <div className="bg-white/95 rounded-full p-3 shadow-lg">
              <CheckCircle weight="fill" className="w-12 h-12 text-primary" />
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getCrowdBadgeVariant(site.crowdLevel)} className="backdrop-blur-sm">
            <Users weight="fill" className="w-3 h-3 mr-1" />
            {site.crowdLevel}
          </Badge>
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant={popularityConfig.variant} className="backdrop-blur-sm">
            <PopularityIcon weight="fill" className="w-3 h-3 mr-1" />
            {popularityConfig.label}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white">
          <Star weight="fill" className="w-4 h-4 text-accent" />
          <span className="font-semibold text-sm">{site.rating}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* ♿ A11Y BUG #3 — Critically low contrast: light gray text on white card fails WCAG AA (ratio < 3:1) */}
            <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2 text-gray-200">
              {site.name}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              {site.category}
            </p>
          </div>
          {/* ♿ A11Y BUG #2 — Non-semantic element: div is not reachable by keyboard (Tab key) and has no role or label */}
          <div
            onClick={() => onToggleVisit(site.id)}
            className="flex-shrink-0 mt-1 hover:scale-110 transition-transform cursor-pointer"
          >
            <Checkbox 
              checked={isVisited}
              className="w-6 h-6"
            />
          </div>
        </div>

        <p className="text-sm text-foreground/80 line-clamp-3">
          {site.description}
        </p>

        <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock weight="bold" className="w-4 h-4" />
            <span>{site.duration}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
