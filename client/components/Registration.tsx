// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router'
// import { useAuth0 } from '@auth0/auth0-react'

// import { useUser } from '../hooks/useUsers.ts'
// import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
// function Registration() {
//   const [errMsg, setErrMsg] = useState('')
//   const { getAccessTokenSilently } = useAuth0()
//   const user = useUser()

//   const handleMutationSuccess = () => {
//     setErrMsg('')
//   }

//   const handleErr = (error: unknown) => {
//     if (error instanceof Error) {
//       setErrMsg(error.message)
//     } else {
//       setErrMsg('Unknown Error ')
//     }
//   }

//   const mutationOptions = {
//     onSuccess: handleMutationSuccess,
//     onError: handleErr,
//   }

//   const navigate = useNavigate()

//   const [form, setForm] = useState({
//     auth0Id: '',
//     username: '',
//     email: '',
//     current_position: '',
//     about_me: '',
//     profile_photo_url: '',
//     created_at: '',
//     location: '',
//   })

//   useEffect(() => {
//     if (user.data) navigate('/')
//   }, [user.data, navigate])

//   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     evt.preventDefault()
//     setForm({
//       ...form,
//       [evt.target.name]: evt.target.value,
//     })
//   }

//   const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
//     const token = await getAccessTokenSilently()
//     evt.preventDefault()

//     const updatedForm = {
//       ...form,
//       created_at: new Date().toISOString(), // ← Add current date in ISO format
//     }

//     user.add.mutate({ newUser: updatedForm, token }, mutationOptions)
//     navigate('/')
//   }

//   const hideError = () => {
//     setErrMsg('')
//   }

//   const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//     const file = evt.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setForm({
//           ...form,
//           profile_photo_url: reader.result as string,
//         })
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   return (
//     <div>
//       <IfAuthenticated>
//         <h1>Register with the InsightStack Family</h1>
//         {errMsg && (
//           <div>
//             Error: {errMsg}
//             <button onClick={hideError}>Okay</button>
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="profile_photo_url">
//               Drop a profile pic (visible to others when you post)
//             </label>
//             <input
//               type="file"
//               id="profile_photo_url"
//               name="profile_photo_url"
//               //value={form.profile_photo_url}
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="username">
//               Username (what others will see you as):{' '}
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={form.username}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="email">What is your email?</label>
//             <input
//               type="text"
//               id="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label htmlFor="current_position">
//               Current role | Career status
//             </label>
//             <input
//               type="text"
//               id="current_position"
//               name="current_position"
//               value={form.current_position}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="about_me">
//               Tell us a little about your experience
//             </label>
//             <input
//               type="text"
//               id="about_me"
//               name="about_me"
//               value={form.about_me}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="location">
//               What city and country are you working in?
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={form.location}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <button disabled={!form.username}>Register</button>
//           </div>
//         </form>
//       </IfAuthenticated>
//       <IfNotAuthenticated>
//         <h1>Please authenticate your account</h1>
//       </IfNotAuthenticated>
//     </div>
//   )
// }

// export default Registration

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
    auth0Id: '',
    username: '',
    email: '',
    current_position: '',
    about_me: '',
    profile_photo_url: '',
    created_at: '',
    location: '',
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

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()

    const updatedForm = {
      ...form,
      created_at: new Date().toISOString(),
    }

    user.add.mutate({ newUser: updatedForm, token }, mutationOptions)
    navigate('/')
  }

  const hideError = () => {
    setErrMsg('')
  }

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({
          ...form,
          profile_photo_url: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    }
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
