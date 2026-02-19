import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SiteForm } from '@/components/SiteForm'
import { Plus } from '@phosphor-icons/react'
import type { Site } from '@/types/site'

interface CreateSiteDialogProps {
  onCreate: (data: Omit<Site, 'id'>) => void
}

export function CreateSiteDialog({ onCreate }: CreateSiteDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (data: Omit<Site, 'id'>) => {
    onCreate(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus weight="bold" className="w-4 h-4 mr-2" />
          Add Site
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Site</DialogTitle>
        </DialogHeader>
        <SiteForm onSubmit={handleSubmit} onCancel={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
