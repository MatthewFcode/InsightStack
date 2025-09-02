import { Link } from 'react-router'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router'
function NavBar() {
  const { logout, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
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
            {/* <Link to="/" className="nav-link home-link">
              Home
            </Link> */}
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

  // return (
  //   <>
  //     <nav className="navbar">
  //       <div className="nav-container">
  //         <div className="nav-left">
  //           <Link
  //             to="/"
  //             className="nav-link home-link"
  //             style={{ marginRight: '5rem', marginLeft: '-5rem' }}
  //           >
  //             Home
  //           </Link>
  //           <IfAuthenticated>
  //             <button onClick={handleLogout}>Logout</button>
  //           </IfAuthenticated>
  //           <IfNotAuthenticated>
  //             <button onClick={handleLogin}>Login</button>
  //           </IfNotAuthenticated>
  //         </div>

  //         <div className="nav-center">
  //           <Link to="/tech" className="nav-link">
  //             Tech
  //           </Link>
  //           <Link to="/skills" className="nav-link">
  //             Human Skills
  //           </Link>
  //         </div>
  //       </div>
  //     </nav>
  //   </>
  // )
}

export default NavBar

// className="nav-link home-link"
