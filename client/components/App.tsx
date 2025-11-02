import { useState, useEffect } from 'react'
import NavBar from './Nav'
import Footer from './Footer'
import Registration from './Account'
import WelcomeOverlay from './WelcomeOverlay'
import { Outlet, useLocation } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

function App() {
  const [showOverlay, setShowOverlay] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket('wss://insightstack.borb.nz/')

    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type == 'database_change') {
        queryClient.invalidateQueries({ queryKey: ['fav-lang-votes'] })
        queryClient.invalidateQueries({ queryKey: ['least-fav-lang-votes'] })
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        queryClient.invalidateQueries({ queryKey: ['skills'] })
      }

      ws.onclose = () => {
        console.log('WebSocket closed')
      }

      ws.onerror = (error) => {
        console.log('WebSocket error', error)
      }
      return () => ws.close()
    }
  }, [queryClient])

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
