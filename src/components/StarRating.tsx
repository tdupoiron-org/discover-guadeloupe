import { Star } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number | null
  onRatingChange: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleClick = (value: number) => {
    if (!readonly) {
      onRatingChange(value)
    }
  }

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          disabled={readonly}
          className={cn(
            'transition-all',
            !readonly && 'hover:scale-110 cursor-pointer',
            readonly && 'cursor-default'
          )}
          aria-label={`Rate ${value} stars`}
        >
          <Star
            weight={rating && value <= rating ? 'fill' : 'regular'}
            className={cn(
              sizeClasses[size],
              rating && value <= rating ? 'text-accent' : 'text-muted-foreground',
              !readonly && 'hover:text-accent/80'
            )}
          />
        </button>
      ))}
    </div>
  )
}
