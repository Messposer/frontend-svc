import DOMPurify from 'dompurify';
interface RawHTMLComponentProps {
  htmlContent: string | null;
}

const RawHTMLComponent: React.FC<RawHTMLComponentProps> = ({ htmlContent }) => {
  if (!htmlContent) return null;

  const sanitizedHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTMLComponent;