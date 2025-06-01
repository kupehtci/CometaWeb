import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import DocPage from './pages/DocPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocsList = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const markdownFiles = [
          'getting-started.md',
          'cometa-layer.md', 
          'cometa-lightning.md',
          'cometa-shaders.md'
        ]
        
        setFiles(markdownFiles)
      } catch (err) {
        console.error('Error loading document list:', err)
        setError('Failed to load the document list. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    }

    fetchDocsList()
  }, [])

  if (loading) {
    return <div className="loading-app">Loading application...</div>
  }

  if (error) {
    return <div className="error-app">{error}</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage files={files} />} />
        <Route path="/docs/:fileName" element={<DocPage files={files} />} />
        <Route path="/about" element={< AboutPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
