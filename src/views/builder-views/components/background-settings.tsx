interface BackgroundSettingsProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="component-container">
      <h4 className="builder-group-title text-primary">Background Settings</h4>
      <div className="builder-group">
        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Background Color:</h5>
          {editedStyles['background-color'] && (
            <input
              type="color"
              value={editedStyles['background-color']}
              title="input-color"
              onChange={(e) => handleStyleChange('background-color', e.target.value)}
            />
          )}
        </div>
        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Background Image:</h5>
          <select
            value={editedStyles['background-image']}
            title="select-background-image"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('background-image', e.target.value)}
          >
            <option value="image1">Image 1</option>
            <option value="image2">Image 2</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;