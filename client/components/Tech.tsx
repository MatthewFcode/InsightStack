import { FormEvent, useState } from 'react'
import {
  useGetPosts,
  useAddPosts,
  useUpdatePosts,
  useDeletePosts,
} from '../hooks/usePosts.ts'
import LoadingState from './LoadingState.tsx'
import { Post } from '../../models/posts.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

// helper function to help format the date
const formatDate = (dateString: string) => {
  if (!dateString) return 'Not specified'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Invalid date'
  }
}
function Tech() {
  const queryClient = useQueryClient()
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'database_change') {
        // Instead of reload → tell React Query to refetch
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // cleanup when component unmounts
    return () => ws.close()
  }, [queryClient])

  const addMutation = useAddPosts()
  const updatePosts = useUpdatePosts()
  const deleteMutation = useDeletePosts()

  const [topicInput, setTopicInput] = useState('')
  const [detailsInput, setDetailsInput] = useState('')
  const [editPostId, setEditPostId] = useState<number | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editDetails, setEditDetails] = useState('')
  const { isAuthenticated, user } = useAuth0()
  const { data, isLoading, isError } = useGetPosts()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div>Error loading posts</div>
  }

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAuthenticated) {
      await addMutation.mutateAsync({
        topic: topicInput,
        postDetails: detailsInput,
      })
      setTopicInput('')
      setDetailsInput('')
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'topic') {
      setTopicInput(value)
    } else if (name === 'details') {
      setDetailsInput(value)
    }
  }

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

  const handleEditClick = (post: Post) => {
    setEditPostId(Number(post.id))
    setEditTopic(post.topic)
    setEditDetails(post.post_details)
  }

  const handleDelete = async (id: number) => {
    if (isAuthenticated) {
      await deleteMutation.mutateAsync(id)
    }
  }

  // Helper function to check if current user owns the post
  const isPostOwner = (post: Post) => {
    return user?.sub === post.post_auth0Id
  }

  return (
    <>
      <h1>Tech Advice Hub</h1>
      <p>Share your technical knowledge and learn from the community</p>

      <form onSubmit={handlePost}>
        <label htmlFor="topic">Topic</label>
        <input
          type="text"
          name="topic"
          value={topicInput}
          onChange={handleChange}
          placeholder="What's your technical topic?"
          required
        />

        <label htmlFor="details">Technical Advice</label>
        <input
          type="text"
          name="details"
          value={detailsInput}
          onChange={handleChange}
          placeholder="Share your expertise and tips..."
          required
        />

        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Publishing...' : 'Publish Advice'}
        </button>
      </form>

      <div className="posts-container">
        <h2>Tech Advice</h2>
        {data && data.length > 0 ? (
          data.map((post) => (
            <div key={post.id} className="post-card">
              {isAuthenticated &&
              editPostId === Number(post.id) &&
              isPostOwner(post) ? (
                <div className="edit-form">
                  <div className="edit-title">Edit Your Post</div>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeholder="Edit topic"
                  />
                  <textarea
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                    placeholder="Edit your technical advice..."
                    rows={4}
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => handleUpdate(Number(post.id))}
                      disabled={updatePosts.isPending}
                      className="btn-primary"
                    >
                      {updatePosts.isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditPostId(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* User Information Display */}
                  <div className="post-author">
                    {/* Avatar */}
                    <div className="author-avatar">
                      {post.profile_photo_url ? (
                        <img
                          src={post.profile_photo_url}
                          alt={`${post.username}'s profile`}
                          className="profile-photo"
                        />
                      ) : (
                        <div className="default-avatar">
                          {post.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>

                    {/* User Info on one line */}
                    <div className="center-user-info">
                      <span className="author-name">
                        {post.username || 'Anonymous User'}
                      </span>

                      {post.current_position && (
                        <>
                          <span className="separator">|</span>
                          <span className="author-position">
                            {post.current_position}
                          </span>
                        </>
                      )}

                      {post.location && (
                        <>
                          <span className="separator">|</span>
                          <span className="author-location">
                            {post.location}
                          </span>
                        </>
                      )}
                      {post.created_at && (
                        <>
                          <span className="separator">|</span>
                          <p className="post-date">
                            {formatDate(post.created_at)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="post-content">
                    <h3>{post.topic}</h3>
                    <p>{post.post_details}</p>
                  </div>

                  {/* Post Actions - Only show for post owner */}
                  {isAuthenticated && isPostOwner(post) && (
                    <div className="post-actions">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(Number(post.id))}
                        disabled={deleteMutation.isPending}
                        className="btn-danger"
                      >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No tech advice yet. Be the first to share your knowledge!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Tech
