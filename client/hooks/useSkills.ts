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
  return useSkillsMutation(createSkillsPost)
}
// react query mutation functions only expect one parameter not two so I am creating a function wrapper to acheive this one parameter type rule
export function useUpdateSkills() {
  const updatePostsWrapper = async (updateData: {
    id: number
    skillsTopic: string
    skillsDetails: string
  }) => {
    const { id, ...updatedDetails } = updateData
    return updateSkillsPost(id, updatedDetails)
  }

  return useSkillsMutation(updatePostsWrapper)
}

export function useDeleteSkills() {
  return useSkillsMutation(deleteSkillsPost)
}
