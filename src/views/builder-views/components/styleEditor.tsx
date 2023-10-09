import BackgroundSettings from './background-settings';
import ComponentSettings from './component-settings';
import TextSettings from './text-settings';
import PositionSettings from './position-settings';
import BorderSettings from './border-settings';

interface StyleEditorProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}
const StyleEditor: React.FC<StyleEditorProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="style-editor-wrapper">
      <TextSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
      <PositionSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
      <BackgroundSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
      <BorderSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
      <ComponentSettings 
        handleStyleChange={handleStyleChange}
        editedStyles={editedStyles}
      />
    </div>
  );
};

export default StyleEditor;
