import { FormEvent, useState } from 'react'
import {
  useAddSkills,
  useUpdateSkills,
  useDeleteSkills,
  useGetSkills,
} from '../hooks/useSkills.ts'
import LoadingState from './LoadingState.tsx'
import { Skills } from '../../models/skills.ts'
import { useAuth0 } from '@auth0/auth0-react'

function SkillsComponent() {
  const addSkillsMutation = useAddSkills()
  const updateSkills = useUpdateSkills()
  const deleteMutation = useDeleteSkills()

  const [topicInput, setTopicInput] = useState('')
  const [detailsInput, setDetailsInput] = useState('')
  const [editPostId, setEditPostId] = useState<number | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const { isAuthenticated, user } = useAuth0()

  const { data, isLoading, isError } = useGetSkills()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div>Error loading skills</div>
  }

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAuthenticated) {
      await addSkillsMutation.mutateAsync({
        skillsTopic: topicInput,
        skillsDetails: detailsInput,
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
    await updateSkills.mutateAsync({
      id,
      skillsTopic: editTopic,
      skillsDetails: editDetails,
    })
    setEditPostId(null)
    setEditTopic('')
    setEditDetails('')
  }

  const handleEditClick = (skill: Skills) => {
    setEditPostId(Number(skill.id))
    setEditTopic(skill.skills_topic)
    setEditDetails(skill.skills_details)
  }

  const handleDelete = async (id: number | string) => {
    if (isAuthenticated) {
      await deleteMutation.mutateAsync(id.toString())
    }
  }

  // Helper function to check if current user owns the post
  const isPostOwner = (skill: Skills) => {
    return user?.sub === skill.skills_auth0Id
  }

  return (
    <>
      <h1>Human Skills Development</h1>
      <p>Share interpersonal wisdom and professional development insights</p>
      <form onSubmit={handlePost}>
        <label htmlFor="topic">Skill Area</label>
        <input
          type="text"
          name="topic"
          value={topicInput}
          onChange={handleChange}
          placeholder="What skill area are you covering?"
          required
        />

        <label htmlFor="details">Development Advice</label>
        <input
          type="text"
          name="details"
          value={detailsInput}
          onChange={handleChange}
          placeholder="Share your insights and practical tips..."
          required
        />

        <button type="submit" disabled={addSkillsMutation.isPending}>
          {addSkillsMutation.isPending ? 'Publishing...' : 'Share Insight'}
        </button>
      </form>
      <div className="posts-container">
        <h2>Human Skills Insights</h2>
        {data && data.length > 0 ? (
          data.map((skill) => (
            <div key={skill.id} className="post-card">
              {isAuthenticated &&
              editPostId === Number(skill.id) &&
              isPostOwner(skill) ? (
                <div className="edit-form">
                  <div className="edit-title">Edit Your Post</div>
                  <input
                    type="text"
                    value={editTopic}
                    onChange={(e) => setEditTopic(e.target.value)}
                    placeholder="Edit skill area"
                  />
                  <textarea
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                    placeholder="Edit your development advice..."
                    rows={4}
                  />
                  <div className="edit-actions">
                    <button
                      onClick={() => handleUpdate(Number(skill.id))}
                      disabled={updateSkills.isPending}
                      className="btn-primary"
                    >
                      {updateSkills.isPending ? 'Saving...' : 'Save Changes'}
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
                  {/*} User Information Display
                  <div className="post-author">
                    <div className="author-avatar">
                      {skill.profile_photo_url ? (
                        <img
                          src={skill.profile_photo_url}
                          alt={`${skill.username}'s profile`}
                          className="profile-photo"
                        />
                      ) : (
                        <div className="default-avatar">
                          {skill.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">
                        {skill.username || 'Anonymous User'}
                      </h4>
                      {skill.current_position && (
                        <p className="author-position">
                          {skill.current_position}
                        </p>
                      )}
                      {skill.location && (
                        <p className="author-location">{skill.location}</p>
                      )}
                      <p className="post-date">
                        {skill.created_at
                          ? new Date(skill.created_at).toLocaleDateString()
                          : 'Unknown date'}
                      </p>
                    </div>
                  </div>

                  {/* Post Content 
                  <div className="post-content">
                    <h3>{skill.skills_topic}</h3>
                    <p>{skill.skills_details}</p>
                  </div> 
                  */}
                  {/* User Information Display */}
                  <div className="post-author">
                    {/* Avatar */}
                    <div className="author-avatar">
                      {skill.profile_photo_url ? (
                        <img
                          src={skill.profile_photo_url}
                          alt={`${skill.username}'s profile`}
                          className="profile-photo"
                        />
                      ) : (
                        <div className="default-avatar">
                          {skill.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>

                    {/* User Info on one line */}
                    <div className="center-user-info">
                      <span className="author-name">
                        {skill.username || 'Anonymous User'}
                      </span>

                      {skill.current_position && (
                        <>
                          <span className="separator">|</span>
                          <span className="author-position">
                            {skill.current_position}
                          </span>
                        </>
                      )}

                      {skill.location && (
                        <>
                          <span className="separator">|</span>
                          <span className="author-location">
                            {skill.location}
                          </span>
                        </>
                      )}

                      {skill.created_at && (
                        <>
                          <span className="separator">|</span>
                          <span className="post-date">
                            {new Date(skill.created_at).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="post-content">
                    <h3>{skill.skills_topic}</h3>
                    <p>{skill.skills_details}</p>
                  </div>

                  {/* Post Actions - Only show for post owner */}
                  {isAuthenticated && isPostOwner(skill) && (
                    <div className="post-actions">
                      <button
                        onClick={() => handleEditClick(skill)}
                        className="btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id!)}
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
            <p>No skills insights yet. Be the first to share your wisdom!</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SkillsComponent
