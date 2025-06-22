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
          'Class_Diagram.md',
          'Application_Class.md',
          'Compilation.md',
          'Premake5.md',
          'Multiplatform.md',
          'Sparse_Set.md',
          'Assertion.md',
          'Components.md',
          'Project_Resources.md',
          'ComponentStorage.md',
          'Layer.md',          
          'Camera.md',
          'Dependencies.md',
          'Managing_Components.md',
          'Physics.md',
          'Physics_Calculation.md',
          'CollisionDispatcher.md',
          'Collision_Resolution.md',
          'markdown-cheat-sheet.md',
          'Mesh.md',
          'Material.md',
          'Scripts.md', 
          'UI_Theme.md',
          'Fonts.md',
          'OpenGL_Notes.md',
          'RENDER-Buffer.md',
          'RENDER-OpenGL_workflow.md',
          'RENDER-Lightning.md',
          'RENDER-Buffers_Abstraction.md',
          'RENDER-Renderable.md',
          'RENDER-Built-in_shaders.md',
          'RENDER-Shaders.md',
          'RENDER-Direct_Mode.md',
          'RENDER-Vertex_Buffer.md',
          'RENDER-Index_Buffer.md'
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
