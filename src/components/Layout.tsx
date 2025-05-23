import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  files: string[];
}

const Layout = ({ children, files }: LayoutProps) => {
  return (
    <div className="app-container">
      <Sidebar files={files} />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;