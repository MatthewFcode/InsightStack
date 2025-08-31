import { FormEvent, useState } from 'react'
import {
  useAddSkills,
  useUpdateSkills,
  useDeleteSkills,
  useGetSkills,
} from '../hooks/useSkills.ts'
import LoadingState from './LoadingState.tsx'
import { Skills } from '../../models/skills.ts'

function SkillsComponent() {
  const addSkillsMutation = useAddSkills()
  const updateSkills = useUpdateSkills()
  const deleteMutation = useDeleteSkills()

  const [topicInput, setTopicInput] = useState('')
  const [detailsInput, setDetailsInput] = useState('')
  const [editPostId, setEditPostId] = useState<number | null>(null)
  const [editTopic, setEditTopic] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const { data, isLoading, isError } = useGetSkills()

  if (isLoading) {
    return <LoadingState />
  }
  if (isError) {
    return <div>Error loading skills</div>
  }

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addSkillsMutation.mutateAsync({
      skillsTopic: topicInput,
      skillsDetails: detailsInput,
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
    await deleteMutation.mutateAsync(id.toString())
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
              {editPostId === Number(skill.id) ? (
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
                  <h3>{skill.skills_topic}</h3>
                  <p>{skill.skills_details}</p>
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
