import { useState, useEffect } from 'react'
import NavBar from './Nav'
import Footer from './Footer'
import Registration from './Account'
import WelcomeOverlay from './WelcomeOverlay'
import { Outlet, useLocation } from 'react-router'

function App() {
  const [showOverlay, setShowOverlay] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (isHomePage && !sessionStorage.getItem('hasVisited')) {
      setShowOverlay(true)
    }
  }, [isHomePage])

  const handleOverlayClose = () => {
    setShowOverlay(false)
    sessionStorage.setItem('hasVisited', 'true')
  }

  return (
    <>
      {/* Overlay at the very top level */}
      {showOverlay && <WelcomeOverlay onClose={handleOverlayClose} />}

      {/* Main app - gets blurred when overlay is active */}
      <div className={`app-layout ${showOverlay ? 'app-blurred' : ''}`}>
        <NavBar />
        <div className="main-content">
          <aside className="registration-panel">
            <Registration />
          </aside>
          <main className="page-content">
            <div className="content-wrapper">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
