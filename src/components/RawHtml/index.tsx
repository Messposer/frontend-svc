import DOMPurify from 'dompurify';

interface RawHTMLComponentProps {
  htmlContent: string;
}

const RawHTMLComponent: React.FC<RawHTMLComponentProps> = ({ htmlContent }) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent) || '';
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTMLComponent;
