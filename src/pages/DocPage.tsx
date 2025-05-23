import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import MarkdownViewer from '../components/MarkdownViewer';

interface DocPageProps {
  files: string[];
}

const DocPage = ({ files }: DocPageProps) => {
  const { fileName } = useParams<{ fileName: string }>();
  
  return (
    <Layout files={files}>
      {fileName ? (
        <MarkdownViewer fileName={fileName} />
      ) : (
        <div className="select-doc-message">
          <h2>Please select a document from the sidebar</h2>
        </div>
      )}
    </Layout>
  );
};

export default DocPage;