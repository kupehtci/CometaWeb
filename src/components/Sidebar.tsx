import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  files: string[];
}

const Sidebar = ({ files }: SidebarProps) => {
  const location = useLocation();
  const [activeFile, setActiveFile] = useState<string>('');

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop() || '';
    setActiveFile(currentPath);
  }, [location]);

  return (
    <div className="sidebar">
      <h2>Documents</h2>
      <ul>
        {files.map((file) => {
          const fileName = file.replace('.md', '');
          const displayName = fileName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
          
          return (
            <li key={fileName} className={activeFile === fileName ? 'active' : ''}>
              <Link to={`/docs/${fileName}`}>{displayName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;