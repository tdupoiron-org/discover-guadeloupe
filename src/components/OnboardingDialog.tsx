import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  MapPin, 
  CheckCircle, 
  Funnel, 
  ChartLineUp, 
  Sparkle 
} from '@phosphor-icons/react'

interface OnboardingDialogProps {
  open: boolean
  onComplete: () => void
}

const onboardingSteps = [
  {
    icon: MapPin,
    title: 'Welcome to Discover Sevilla!',
    description: 'Your personal guide to exploring the most captivating sites in Sevilla. Let us show you around and help you make the most of your visit.',
  },
  {
    icon: CheckCircle,
    title: 'Track Your Journey',
    description: 'Mark sites as visited by clicking the checkbox on each card. Build your personal travel story as you explore the city.',
  },
  {
    icon: Funnel,
    title: 'Filter Your View',
    description: 'Use the filter buttons at the top to see all sites, only unvisited ones, or review the places you\'ve already experienced.',
  },
  {
    icon: ChartLineUp,
    title: 'Watch Your Progress',
    description: 'As you visit sites, your progress bar will fill up. See how much of Sevilla you\'ve discovered and celebrate your accomplishments!',
  },
]

export function OnboardingDialog({ open, onComplete }: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const isLastStep = currentStep === onboardingSteps.length - 1
  const progressValue = ((currentStep + 1) / onboardingSteps.length) * 100
  
  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }
  
  const handleSkip = () => {
    onComplete()
  }
  
  const step = onboardingSteps[currentStep]
  const StepIcon = step.icon
  
  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleSkip()
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <StepIcon weight="fill" className="w-12 h-12 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            {step.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {step.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Progress value={progressValue} className="h-2" />
          <p className="text-center text-xs text-muted-foreground mt-2">
            Step {currentStep + 1} of {onboardingSteps.length}
          </p>
        </div>
        
        <DialogFooter className="flex-row gap-2 sm:justify-between">
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {!isLastStep && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNext}
            >
              {isLastStep ? (
                <>
                  <Sparkle weight="fill" />
                  Get Started
                </>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
