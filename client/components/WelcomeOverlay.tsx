import { useEffect } from 'react'

interface WelcomeOverlayProps {
  onClose: () => void
}

function WelcomeOverlay({ onClose }: WelcomeOverlayProps) {
  useEffect(() => {
    localStorage.setItem('hasVisited', 'true')
  }, [])

  const handleContinue = () => {
    onClose()
  }

  return (
    <div className="welcome-overlay">
      <div className="welcome-backdrop" onClick={handleContinue}></div>
      <div className="welcome-modal">
        <div className="welcome-content">
          <h1>Welcome to InsightStack! 🗂️ </h1>
          <p>
            InsightStack is a browser based posting platform where users can log
            in and create a profile and then make posts in our Tech and Human
            Skills channels and read other peoples ideas. 💡
          </p>
          <p>
            There are polls on the home page where you can click on your
            favourite and least favourite programming languages and you will
            then be able to see the results straight away (you dont need to be
            logged in to be able to do this).
          </p>
          <h2>Thanks for visiting InsightStack!</h2>
          <button className="welcome-continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeOverlay
