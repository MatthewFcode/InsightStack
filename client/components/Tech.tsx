import { FormEvent, useState } from 'react'
import {
  useGetPosts,
  useAddPosts,
  useUpdatePosts,
  useDeletePosts,
} from '../hooks/usePosts.ts'
import LoadingState from './LoadingState.tsx'
import { Post } from '../../models/posts.ts'

function Tech() {
  const addMutation = useAddPosts()
  const updatePosts = useUpdatePosts()
  const deleteMutation = useDeletePosts()
  // state for the topic field
  const [topicInput, setTopicInput] = useState('')
  // state for the post details field
  const [detailsInput, setDetailsInput] = useState('')

  const [editPostId, setEditPostId] = useState<number | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const { data, isLoading, isError } = useGetPosts()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div>Error loading posts</div>
  }

  // post button logic
  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
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

  // handling the udpate logic
  const handleUpdate = async (id: number) => {
    await updatePosts.mutateAsync({
      id,
      topic: editTopic,
      postDetails: editDetails,
    })
    setEditPostId(null)
    setEditTopic('')
    setEditDetails('')
  }

  // on edit handler
  const handleEditClick = (post: Post) => {
    setEditPostId(post.id ?? null)
    setEditTopic(post.topic)
    setEditDetails(post.post_details)
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
        <form onSubmit={handlePost}>
          <label htmlFor="Topic">Topic</label>
          <input
            type="text"
            name="topic"
            value={topicInput}
            onChange={handleChange}
            placeholder="What's your topic?"
          />
          <label htmlFor="Details">Advice</label>
          <input
            type="text"
            name="details"
            value={detailsInput}
            onChange={handleChange}
            placeholder="What are your tips?"
          />
          <button type="submit">Post</button>
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
              {editPostId === post.id ? (
                <>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      post.id !== undefined && handleUpdate(post.id)
                    }
                  >
                    {updatePosts.isPending ? 'Updating...' : 'Save'}
                  </button>
                  <button onClick={() => setEditPostId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{post.topic}</h3>
                  <p>{post.post_details}</p>
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                  <button
                    onClick={() =>
                      post.id !== undefined && handleDelete(post.id)
                    }
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No posts yet. Be the first to post!</p>
        )}
      </div>
    </>
  )
}

export default Tech
