import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import {
  getFavLanguages,
  getFavLanguageVotes,
  sendVote,
} from '../apis/fav-votes.ts'

export function useGetFavLanguages() {
  const languages = useQuery({
    queryKey: ['fav-languages'],
    queryFn: getFavLanguages,
  })
  return languages
}

export function useGetFavLangVotes() {
  const favVotes = useQuery({
    queryKey: ['fav-lang-votes'],
    queryFn: getFavLanguageVotes,
  })
  return favVotes
}

export function useSomethingMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fav-languages'] })
      queryClient.invalidateQueries({ queryKey: ['fav-lang-votes'] })
    },
  })
  return mutation
}

export async function useAddFavVote() {
  return useSomethingMutation(sendVote)
}
