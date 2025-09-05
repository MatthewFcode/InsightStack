import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

import { useUser } from '../hooks/useUsers.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function Registration() {
  const [errMsg, setErrMsg] = useState('')
  const { getAccessTokenSilently } = useAuth0()
  const user = useUser()

  const handleMutationSuccess = () => {
    setErrMsg('')
  }

  const handleErr = (error: unknown) => {
    if (error instanceof Error) {
      setErrMsg(error.message)
    } else {
      setErrMsg('Unknown Error ')
    }
  }

  const mutationOptions = {
    onSuccess: handleMutationSuccess,
    onError: handleErr,
  }

  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    current_position: '',
    about_me: '',
    location: '',
    file: null as File | null,
  })

  useEffect(() => {
    if (user.data) navigate('/')
  }, [user.data, navigate])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files[0]) {
      setForm({ ...form, file: evt.target.files[0] })
    }
  }
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()

    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('email', form.email)
    formData.append('current_position', form.current_position)
    formData.append('about_me', form.about_me)
    formData.append('location', form.location)
    formData.append('created_at', new Date().toISOString())

    if (form.file) {
      formData.append('uploaded_file', form.file)
    }
    user.add.mutate({ formData, token }, mutationOptions)

    navigate('/')
  }

  const hideError = () => {
    setErrMsg('')
  }

  return (
    <div className="registration-page">
      <IfAuthenticated>
        <div className="registration-container">
          <div className="registration-card">
            <h1>Join InsightStack</h1>
            <p className="registration-subtitle">
              Connect with professionals and share your expertise
            </p>

            {errMsg && (
              <div className="error-message">
                <span className="error-text">Error: {errMsg}</span>
                <button className="error-dismiss" onClick={hideError}>
                  Dismiss
                </button>
              </div>
            )}

            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="profile_photo_url">Profile Picture</label>
                <input
                  type="file"
                  id="profile_photo_url"
                  name="profile_photo_url"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="current_position">Current Position</label>
                <input
                  type="text"
                  id="current_position"
                  name="current_position"
                  value={form.current_position}
                  onChange={handleChange}
                  placeholder="Software Engineer, Product Manager, etc."
                />
              </div>

              <div className="form-group">
                <label htmlFor="about_me">About You</label>
                <input
                  type="text"
                  id="about_me"
                  name="about_me"
                  value={form.about_me}
                  onChange={handleChange}
                  placeholder="Tell us about your experience and expertise"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={!form.username}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <div className="registration-container">
          <div className="auth-prompt">
            <h1>Authentication Required</h1>
            <p>
              Please sign in with your account to join the InsightStack
              community and start sharing your professional expertise.
            </p>
          </div>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}

export default Registration
