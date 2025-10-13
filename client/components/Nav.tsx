import { Link } from 'react-router'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
function NavBar() {
  const { logout, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/registration`,
      },
    })
  }

  const handleHomeClick = () => {
    navigate('/')
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <button onClick={handleHomeClick}>Home</button>

            <IfNotAuthenticated>
              <button className="login-link" onClick={handleLogin}>
                Login
              </button>
            </IfNotAuthenticated>
            <IfAuthenticated>
              <button className="login-link" onClick={handleLogout}>
                Logout
              </button>
            </IfAuthenticated>
            <div className="nav-separator"></div>
          </div>
          <div className="nav-center">
            <Link to="/tech" className="nav-link">
              Tech
            </Link>
            <Link to="/skills" className="nav-link">
              Human Skills
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar
