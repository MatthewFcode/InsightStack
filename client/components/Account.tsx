// export default Registration
import { useUser } from '../hooks/useUsers.ts'
//import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function Account() {
  //const { user } = useAuth0()
  const { data: userData } = useUser()

  // Helper function to format date
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

  // Helper function to get user initials
  const getUserInitials = (username: string) => {
    if (!username) return 'U'
    return username.charAt(0).toUpperCase()
  }

  return (
    <>
      <IfAuthenticated>
        <div className="account-card">
          <div className="account-header">
            <div className="profile-photo-container">
              {userData?.profile_photo_url ? (
                <img
                  src={userData.profile_photo_url}
                  alt="profile-picture"
                  className="profile-photo"
                />
              ) : (
                <div className="photo-placeholder">
                  {getUserInitials(userData?.username || '')}
                </div>
              )}
            </div>

            <div className="username-display">
              <span className="username-label">Signed in as</span>
              <span className="username-value">
                {userData?.username || 'Loading...'}
              </span>
            </div>
          </div>

          <div className="account-info">
            {userData?.current_position && (
              <div className="info-item">
                <span className="info-label">Position</span>
                <span className="info-value primary">
                  {userData.current_position}
                </span>
              </div>
            )}

            {userData?.location && (
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{userData.location}</span>
              </div>
            )}

            {userData?.about_me && (
              <div className="info-item">
                <span className="info-label">About</span>
                <span className="info-value">{userData.about_me}</span>
              </div>
            )}

            {userData?.email && (
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{userData.email}</span>
              </div>
            )}
          </div>

          {userData?.created_at && (
            <div className="account-footer">
              <div className="account-metadata">
                <div className="metadata-item">
                  <div className="metadata-label">Member Since</div>
                  <div className="metadata-value">
                    {formatDate(userData.created_at)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <div className="sign-in">
          <h2 className="signin-text">
            Sign in or create account to post and interact with posts
          </h2>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

export default Account
