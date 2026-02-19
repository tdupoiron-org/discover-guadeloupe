import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSites, createSite, updateSite, deleteSite } from '@/services/sites-api'
import type { Site } from '@/types/site'

const SITES_KEY = ['sites']

export function useSites() {
  const queryClient = useQueryClient()

  const sitesQuery = useQuery({
    queryKey: SITES_KEY,
    queryFn: getSites,
  })

  const createMutation = useMutation({
    mutationFn: (site: Omit<Site, 'id'>) => createSite(site),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITES_KEY })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Site> }) => updateSite(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITES_KEY })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SITES_KEY })
    },
  })

  return {
    sites: sitesQuery.data ?? [],
    isLoading: sitesQuery.isLoading,
    isError: sitesQuery.isError,
    error: sitesQuery.error,
    createSite: createMutation.mutateAsync,
    updateSite: updateMutation.mutateAsync,
    deleteSite: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
