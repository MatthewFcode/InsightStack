import { getPosts, addPosts, updatePosts, deletePosts } from '../apis/posts.ts'
import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'

export function useGetPosts() {
  // getting all of the data from my api route and stroing it as a custom hook in this function
  const allPosts = useQuery({ queryKey: ['posts'], queryFn: getPosts })
  return allPosts
}

export function usePostMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return mutation
}

export function useAddPosts() {
  return usePostMutation(addPosts)
}
// react query mutation functions only expect one parameter not two so I am creating a function wrapper to acheive this one parameter type rule
export function useUpdatePosts() {
  const updatePostsWrapper = async (updateData: {
    id: number
    topic: string
    postDetails: string
  }) => {
    const { id, ...updatedDetails } = updateData
    return updatePosts(id, updatedDetails)
  }

  return usePostMutation(updatePostsWrapper)
}

export function useDeletePosts() {
  return usePostMutation(deletePosts)
}
