import { useState } from 'react'
import {
  useGetPosts,
  useAddPosts,
  useUpdatePosts,
  useDeletePosts,
} from '../hooks/usePosts.ts'

function Tech() {
  const addMutation = useAddPosts()
  const updatePosts = useUpdatePosts()
  const deleteMutation = useDeletePosts()

  const { data, isLoading, isError } = useGetPosts()

  // state for the topic field
  const [topicInput, setTopicInput] = useState('')
  // state for the post details field
  const [detailsInput, setDetailsInput] = useState('')
  // post button logic
  const handlePost = async (event) => {
    await addMutation.mutateAsync({
      topic: topicInput,
      postDetails: detailsInput,
    })
    setTopicInput('')
    setDetailsInput('')
  }
  return (
    <>
      <div>
        <h1>Tech</h1>
      </div>
      <div>
        <form>
          <label></label>
          <input type="text" placeholder="Whats you're topic?" />
          <label></label>
          <input type="text" placeholder="What are you're tips?" />
        </form>
      </div>
    </>
  )
}

export default Tech
