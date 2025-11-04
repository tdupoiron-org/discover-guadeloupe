import { MapPin, CheckCircle, Funnel, Sparkle, Icon } from '@phosphor-icons/react'

export interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: Icon
  image?: string
}

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Sevilla!',
    description: 'Welcome to your personal guide for discovering Sevilla\'s most iconic sites. This app will help you explore the city and track your journey through its magnificent attractions.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'
  },
  {
    id: 'explore',
    title: 'Explore Curated Sites',
    description: 'Browse through 12 carefully selected locations in Sevilla. Each card shows visit duration, crowd levels, ratings, and whether it\'s a must-see attraction.',
    icon: Sparkle,
  },
  {
    id: 'track',
    title: 'Track Your Visits',
    description: 'Mark sites as visited by checking the box on each card. Your progress is saved automatically, so you can track your journey throughout your stay.',
    icon: CheckCircle,
  },
  {
    id: 'filter',
    title: 'Filter Your View',
    description: 'Use the filter buttons to view all sites, only unvisited locations, or celebrate the places you\'ve already explored. Your adventure awaits!',
    icon: Funnel,
  }
]
