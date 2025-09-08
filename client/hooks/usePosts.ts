import { getPosts, addPosts, updatePosts, deletePosts } from '../apis/posts.ts'
import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

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
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const addPostsWithAuth = async (newPost: {
    topic: string
    postDetails: string
  }) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return addPosts(newPost, token)
  }
  return usePostMutation(addPostsWithAuth)
}
// react query mutation functions only expect one parameter not two so I am creating a function wrapper to acheive this one parameter type rule
export function useUpdatePosts() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const updatePostsWrapper = async (updateData: {
    id: number
    topic: string
    postDetails: string
  }) => {
    const { id, ...updatedDetails } = updateData
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return updatePosts(id, updatedDetails, token)
  }

  return usePostMutation(updatePostsWrapper)
}

export function useDeletePosts() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const deletePostWrapper = async (id: unknown) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }

    if (!token) {
      throw new Error('User is not authenticated')
    }
    return deletePosts(id, token)
  }
  return usePostMutation(deletePostWrapper)
}
