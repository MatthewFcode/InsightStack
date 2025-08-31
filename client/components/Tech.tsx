// import { FormEvent, useState } from 'react'
// import {
//   useGetPosts,
//   useAddPosts,
//   useUpdatePosts,
//   useDeletePosts,
// } from '../hooks/usePosts.ts'
// import LoadingState from './LoadingState.tsx'
// import { Post } from '../../models/posts.ts'

// function Tech() {
//   const addMutation = useAddPosts()
//   const updatePosts = useUpdatePosts()
//   const deleteMutation = useDeletePosts()

//   const [topicInput, setTopicInput] = useState('')
//   const [detailsInput, setDetailsInput] = useState('')
//   const [editPostId, setEditPostId] = useState<number | null>(null)
//   const [editTopic, setEditTopic] = useState('')
//   const [editDetails, setEditDetails] = useState('')

//   const { data, isLoading, isError } = useGetPosts()

//   if (isLoading) {
//     return <LoadingState />
//   }
//   if (isError) {
//     return <div>Error loading posts</div>
//   }

//   const handlePost = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     await addMutation.mutateAsync({
//       topic: topicInput,
//       postDetails: detailsInput,
//     })
//     setTopicInput('')
//     setDetailsInput('')
//   }

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target
//     if (name === 'topic') {
//       setTopicInput(value)
//     } else if (name === 'details') {
//       setDetailsInput(value)
//     }
//   }

//   const handleUpdate = async (id: number) => {
//     await updatePosts.mutateAsync({
//       id,
//       topic: editTopic,
//       postDetails: editDetails,
//     })
//     setEditPostId(null)
//     setEditTopic('')
//     setEditDetails('')
//   }

//   const handleEditClick = (post: Post) => {
//     setEditPostId(Number(post.id))
//     setEditTopic(post.topic)
//     setEditDetails(post.post_details)
//   }

//   const handleDelete = async (id: number) => {
//     await deleteMutation.mutateAsync(id)
//   }

//   return (
//     <>
//       <h1>Tech Advice Hub</h1>
//       <p>Share your technical knowledge and learn from the community</p>

//       <form onSubmit={handlePost}>
//         <label htmlFor="topic">Topic</label>
//         <input
//           type="text"
//           name="topic"
//           value={topicInput}
//           onChange={handleChange}
//           placeholder="What's your technical topic?"
//           required
//         />

//         <label htmlFor="details">Technical Advice</label>
//         <input
//           type="text"
//           name="details"
//           value={detailsInput}
//           onChange={handleChange}
//           placeholder="Share your expertise and tips..."
//           required
//         />

//         <button type="submit" disabled={addMutation.isPending}>
//           {addMutation.isPending ? 'Publishing...' : 'Publish Advice'}
//         </button>
//       </form>

//       <div className="posts-container">
//         <h2>Community Tech Advice</h2>
//         {data && data.length > 0 ? (
//           data.map((post) => (
//             <div key={post.id} className="post-card">
//               {editPostId === Number(post.id) ? (
//                 <div className="edit-form">
//                   <input
//                     type="text"
//                     value={editTopic}
//                     onChange={(e) => setEditTopic(e.target.value)}
//                     placeholder="Edit topic"
//                   />
//                   <input
//                     type="text"
//                     value={editDetails}
//                     onChange={(e) => setEditDetails(e.target.value)}
//                     placeholder="Edit advice"
//                   />
//                   <div className="edit-actions">
//                     <button
//                       onClick={() => handleUpdate(Number(post.id))}
//                       disabled={updatePosts.isPending}
//                       className="btn-primary"
//                     >
//                       {updatePosts.isPending ? 'Saving...' : 'Save Changes'}
//                     </button>
//                     <button
//                       onClick={() => setEditPostId(null)}
//                       className="btn-secondary"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <h3>{post.topic}</h3>
//                   <p>{post.post_details}</p>
//                   <div className="post-actions">
//                     <button
//                       onClick={() => handleEditClick(post)}
//                       className="btn-secondary"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(Number(post.id))}
//                       disabled={deleteMutation.isPending}
//                       className="btn-danger"
//                     >
//                       {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="empty-state">
//             <p>No tech advice yet. Be the first to share your knowledge!</p>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default Tech
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

  const [topicInput, setTopicInput] = useState('')
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

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
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
    await deleteMutation.mutateAsync(id)
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
        <h2>Community Tech Advice</h2>
        {data && data.length > 0 ? (
          data.map((post) => (
            <div key={post.id} className="post-card">
              {editPostId === Number(post.id) ? (
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
                  <h3>{post.topic}</h3>
                  <p>{post.post_details}</p>
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
