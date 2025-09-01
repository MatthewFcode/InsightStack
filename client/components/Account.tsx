import { useAuth0 } from '@auth0/auth0-react'

function Registration() {
  const { isAuthenticated, user } = useAuth0()
  return (
    <div>
      <h1>Account</h1>
      {isAuthenticated && user ? (
        <p>
          Logged in as: <strong>{user.nickname}</strong>
        </p>
      ) : (
        <p>Please log in to view your account info.</p>
      )}
    </div>
  )
}

export default Registration
