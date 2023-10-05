interface PositionSettingsProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const PositionSettings: React.FC<PositionSettingsProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="component-container">
      <h4 className="builder-group-title text-primary">Position Settings</h4>
      <div className="builder-group">

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Position:</h5>
          <select
            value={editedStyles['justify-content']}
            title="select-justify-content"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('justify-content', e.target.value)}
          >
            <option value="start">Start</option>
            <option value="center">Center</option>
            <option value="end">End</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default PositionSettings;