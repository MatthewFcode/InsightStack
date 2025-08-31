import { Link } from 'react-router'

function NavBar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-link home-link">
              Home
            </Link>
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
