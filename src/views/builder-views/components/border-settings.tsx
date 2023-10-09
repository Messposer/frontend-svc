interface BorderSettingsProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const BorderSettings: React.FC<BorderSettingsProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="component-container">
      <h4 className="builder-group-title text-primary">Border Settings</h4>
      <div className="builder-group">

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Border Style:</h5>
          <select
            value={editedStyles['border-Style']}
            title="select-font-family"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('border-Style', e.target.value)}
          >
            <option value="solid">Solid</option>
            <option value="dotted">Dotted</option>
            <option value="dashed">Dashed</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
            <option value="inset">Inset</option>
            <option value="outset">Outset</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Border Width:</h5>
          <input
            type="number"
            value={parseInt(editedStyles['border-width'])}
            title="input-number"
            className="builder-input-small"
            onChange={(e) => handleStyleChange('border-width', e.target.value + 'px')}
          />
        </div>

        
        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Border Color:</h5>
          <input
            type="color"
            value={editedStyles['border-color']}
            title="input-color"
            className="builder-input-small"
            onChange={(e) => handleStyleChange('border-color', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BorderSettings;