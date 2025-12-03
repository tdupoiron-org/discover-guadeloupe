import { SquaresFour, MapTrifold } from '@phosphor-icons/react'

interface ViewSwitcherProps {
  currentView: 'grid' | 'map'
  onViewChange: (view: 'grid' | 'map') => void
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-2 bg-secondary rounded-full p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          currentView === 'grid'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-secondary-foreground hover:bg-secondary/80'
        }`}
        aria-label="Grid view"
      >
        <SquaresFour weight={currentView === 'grid' ? 'fill' : 'regular'} className="w-4 h-4" />
        <span>Grid</span>
      </button>
      <button
        onClick={() => onViewChange('map')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          currentView === 'map'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-secondary-foreground hover:bg-secondary/80'
        }`}
        aria-label="Map view"
      >
        <MapTrifold weight={currentView === 'map' ? 'fill' : 'regular'} className="w-4 h-4" />
        <span>Map</span>
      </button>
    </div>
  )
}
