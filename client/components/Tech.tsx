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
  // state for the topic field
  const [topicInput, setTopicInput] = useState('')
  // state for the post details field
  const [detailsInput, setDetailsInput] = useState('')

  const { data, isLoading, isError } = useGetPosts()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div>Error loading posts</div>
  }

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

  // handling the change for the value of the topic and details text forms
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'topic') {
      setTopicInput(value)
    } else if (name === 'details') {
      setDetailsInput(value)
    }
  }

  // delete button logic - simplified since React Query handles errors
  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id)
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
            placeholder="What's your topic?"
          />
          <label htmlFor="Details">Details</label>
          <input
            type="text"
            name="details"
            value={detailsInput}
            onChange={handleChange}
            placeholder="What are your tips?"
          />
          <button onClick={handlePost} disabled={addMutation.isPending}>
            {addMutation.isPending ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
      {/* Display posts */}
      <div>
        <h2>Posts</h2>
        {data && data.length > 0 ? (
          data.map((post) => (
            <div
              key={post.id}
              style={{
                border: '1px solid #ccc',
                margin: '10px 0',
                padding: '10px',
              }}
            >
              <h3>{post.topic}</h3>
              <p>{post.postDetails}</p>
              <button
                onClick={() => handleDelete(post.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ))
        ) : (
          <p>No posts yet. Create your first post above!</p>
        )}
      </div>
    </>
  )
}

export default Tech
