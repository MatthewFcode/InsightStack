import { useState } from 'react'
import {
  useGetPosts,
  useAddPosts,
  useUpdatePosts,
  useDeletePosts,
} from '../hooks/usePosts.ts'
import LoadingState from './LoadingState.tsx'

function Tech() {
  const addMutation = useAddPosts()
  const updatePosts = useUpdatePosts()
  const deleteMutation = useDeletePosts()

  const { data, isLoading, isError } = useGetPosts()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div></div>
  }
  // state for the topic field
  const [topicInput, setTopicInput] = useState('')
  // state for the post details field
  const [detailsInput, setDetailsInput] = useState('')
  // post button logic
  const handlePost = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await addMutation.mutateAsync({
      topic: topicInput,
      postDetails: detailsInput,
    })
    setTopicInput('')
    setDetailsInput('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'topic') {
      setTopicInput(value)
    } else if (name === 'details') {
      setDetailsInput(value)
    }
  }

  return (
    <>
      <div>
        <h1>Tech</h1>
      </div>
      <div>
        <form>
          <label htmlFor="Topic">Topic</label>
          <input
            type="text"
            name="topic"
            value={topicInput}
            onChange={handleChange}
            placeholder="Whats you're topic?"
          />
          <label htmlFor="Details">Details</label>
          <input
            type="text"
            name="details"
            value={detailsInput}
            onChange={handleChange}
            placeholder="What are you're tips?"
          />
          <button onClick={handlePost}>Post</button>
        </form>
      </div>
    </>
  )
}

export default Tech
