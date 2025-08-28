function LoadingState() {
  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div className="spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  )
}

export default LoadingState
