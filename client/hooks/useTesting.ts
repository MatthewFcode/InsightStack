import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getTestingMessages } from '../apis/testing.ts'

export function useGetTestingMessages() {
  const { getAccessTokenSilently, user } = useAuth0()
  const result = useQuery({
    queryKey: ['testing'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getTestingMessages(token)
    },
    enabled: !!user,
  })
  return result
}
