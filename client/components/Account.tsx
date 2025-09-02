import { useUser } from '../hooks/useUsers.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
function Registration() {
  const { user } = useAuth0()
  // const { getAccessTokenSilently } = useAuth0()
  const { data: userData } = useUser()
  return (
    <div>
      <IfAuthenticated>
        <h1>Account</h1>
        {userData?.profile_photo_url && (
          <img src={userData.profile_photo_url} alt="profile-picture" />
        )}
        {user && (
          <h1>
            Signed in as: <b>{userData?.username}</b>
          </h1>
        )}
        <h2>
          Career: <b>{userData?.current_position}</b>
        </h2>
        <p>
          About: <b>{userData?.about_me}</b>
        </p>
        <h4>
          Location: <b>{userData?.location}</b>{' '}
        </h4>
        <div>
          <p>{userData?.email} </p>
          <p>Account created at {userData?.created_at}</p>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div>
          <h2>Sign in or create account to post and interact with posts</h2>
        </div>
      </IfNotAuthenticated>
    </div>
  )
}

export default Registration
