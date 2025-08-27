import NavBar from './Nav'
import Footer from './Footer'
import Registration from './Registiration'
import { Outlet } from 'react-router'

function App() {
  return (
    <div className="app-layout">
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
  )
}

export default App
