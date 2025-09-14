import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

import {
  getLeastFavLanguages,
  getLeastFavLangVotes,
  sendLeastFavVote,
} from '../apis/non-fav-votes.ts'

export function useGetLeastFavLanguages() {
  const languages = useQuery({
    queryKey: ['least-fav-langs'],
    queryFn: getLeastFavLanguages,
  })
  return languages
}

export function useGetLeastFavLangVotes() {
  const votes = useQuery({
    queryKey: ['least-fav-lang-votes'],
    queryFn: getLeastFavLangVotes,
  })
  return votes
}

export function useSomethingMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['least-fav-langs'] })
      queryClient.invalidateQueries({ queryKey: ['least-fav-lang-votes'] })
    },
  })
  return mutation
}

export function useAddVote() {
  return useSomethingMutation(sendLeastFavVote)
}
