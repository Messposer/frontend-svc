import ComponentSettings from './component-settings';

interface StyleEditorProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}
const StyleEditor: React.FC<StyleEditorProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="style-editor-wrapper">
      <ComponentSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
    </div>
  );
};

export default StyleEditor;
