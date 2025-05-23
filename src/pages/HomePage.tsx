import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

interface HomePageProps {
  files: string[];
}

const HomePage = ({ files }: HomePageProps) => {
  return (
    <Layout files={files}>
      <div className="home-page">
        <h1>Markdown Documentation Viewer</h1>
        <p>Welcome to the Markdown Documentation Viewer. Select a document from the sidebar to get started.</p>
        
        <div className="quick-links">
          <h2>Quick Links</h2>
          <ul>
            {files.map((file) => {
              const fileName = file.replace('.md', '');
              const displayName = fileName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              return (
                <li key={fileName}>
                  <Link to={`/docs/${fileName}`}>{displayName}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;