import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import {
  getSkillsPosts,
  createSkillsPost,
  updateSkillsPost,
  deleteSkillsPost,
} from '../apis/skills'
import { useAuth0 } from '@auth0/auth0-react'

export function useGetSkills() {
  // getting all of the data from my api route and stroing it as a custom hook in this function
  const allPosts = useQuery({ queryKey: ['skills'], queryFn: getSkillsPosts })
  return allPosts
}

export function useSkillsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] })
    },
  })
  return mutation
}

export function useAddSkills() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const addSkillsWrapper = async (newSkill: {
    skillsTopic: string
    skillsDetails: string
  }) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return createSkillsPost(newSkill, token)
  }
  return useSkillsMutation(addSkillsWrapper)
}
// react query mutation functions only expect one parameter not two so I am creating a function wrapper to acheive this one parameter type rule
export function useUpdateSkills() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const updatePostsWrapper = async (updateData: {
    id: number
    skillsTopic: string
    skillsDetails: string
  }) => {
    const { id, ...updatedDetails } = updateData
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }

    return updateSkillsPost(id, updatedDetails, token)
  }

  return useSkillsMutation(updatePostsWrapper)
}

export function useDeleteSkills() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const deleteSkillsWrapper = async (id: string) => {
    let token = undefined
    if (isAuthenticated) {
      token = await getAccessTokenSilently()
    }
    if (!token) {
      throw new Error('User is not authenticated')
    }
    return deleteSkillsPost(id, token)
  }
  return useSkillsMutation(deleteSkillsWrapper)
}
