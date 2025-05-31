import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface HomePageProps {
  files: string[];
}

const HomePage = ({ files }: HomePageProps) => {
  return (
    <Layout files={files}>
      <div className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Cometa Framework</h1>
            <p className="hero-subtitle">A high customizable and efficient videogame development framework for videogames</p>
            <div className="hero-buttons">
              <Link to={`/docs/${files[0]?.replace('.md', '')}`} className="primary-button">Get Started</Link>
              <a href="https://github.com/kupehtci/Cometa" target="_blank" rel="noopener noreferrer" className="secondary-button">GitHub</a>
            </div>
          </div>
        </section>          
        
        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
              </div>
              <h3>Layers</h3>
              <p>Efficient layers system with optimized performance and event propagation.</p>
              <Link to="/docs/cometa-layer" className="feature-link">Learn more</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
              </div>
              <h3>Entity Component System</h3>
              <p>Complex ECS with support for Rendering, physics simulations, scripting and more</p>
              <Link to="/docs/cometa-lightning" className="feature-link">Learn more</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"/>
                </svg>
              </div>
              <h3>Cometa Render integration</h3>
              <p>Advanced shader and lighting system for creating stunning visual effects with minimal effort.</p>
              <Link to="/docs/cometa-shaders" className="feature-link">Learn more</Link>
            </div>
          </div>
        </section>

        <section className="hero-section-2">
          <div className="hero-content">
            <h1>Cometa Renderer</h1>
            <p className="hero-subtitle">Start programming games from scratch with powerfull visuals</p>
            <div className="hero-buttons">
              <Link to={`/docs/${files[0]?.replace('.md', '')}`} className="primary-button">Get Started</Link>
              <a href="https://github.com/kupehtci/CometaRender" target="_blank" rel="noopener noreferrer" className="secondary-button">GitHub</a>
            </div>
          </div>
        </section> 
        
        <section className="documentation-section">
          <h2>Documentation</h2>
          <p>Explore the documentation to get started with Cometa Framework and Cometa Render:</p>
          <div className="docs-grid">
            {files.map((file) => {
              const fileName = file.replace('.md', '');
              const displayName = fileName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              return (
                <div key={fileName} className="doc-card">
                  <h3>{displayName}</h3>
                  <Link to={`/docs/${fileName}`} className="doc-link">Read Documentation</Link>
                </div>
              );
            })}
          </div>
        </section>
        
        <section className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Dive into Cometa Framework and transform your rendering capabilities today.</p>
          <Link to={`/docs/getting-started`} className="cta-button">Start Building Now</Link>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;