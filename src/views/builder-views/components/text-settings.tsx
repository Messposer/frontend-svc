interface TextSettingsProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const TextSettings: React.FC<TextSettingsProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="component-container">
      <h4 className="builder-group-title text-primary">Text Settings</h4>
      <div className="builder-group">

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Family:</h5>
          <select
            value={editedStyles['font-family']}
            title="select-font-family"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('font-family', e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Text Color:</h5>
          <input
            type="color"
            value={editedStyles['color']}
            title="input-color"
            className="builder-input-small"
            onChange={(e) => handleStyleChange('color', e.target.value)}
          />
        </div>


        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Weight:</h5>
          <select
            value={editedStyles['font-weight']}
            title="select-font-weight"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('font-weight', e.target.value)}
          >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Line Height:</h5>
          <input
            type="number"
            value={parseInt(editedStyles['line-height'])}
            title="input-number"
            className="builder-input-small"
            onChange={(e) => handleStyleChange('line-height', e.target.value + 'px')}
          />
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Text Align:</h5>
          <select
            value={editedStyles['text-align']}
            title="select-text-align"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('text-align', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Text Transform:</h5>
          <select
            value={editedStyles['text-transform']}
            title="select-text-transform"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('text-transform', e.target.value)}
          >
            <option value="capitalize">Capitalize</option>
            <option value="lowercase">Lowercase</option>
            <option value="uppercase">Uppercase</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Font Style:</h5>
          <select
            value={editedStyles['font-style']}
            title="select-font-style"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('font-style', e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
          </select>
        </div>

        <div className="builder-property-wrapper">
          <h5 className="builder-group-title">Text Decoration:</h5>
          <select
            value={editedStyles['text-decoration']}
            title="select-text-decoration"
            className="builder-select-small"
            onChange={(e) => handleStyleChange('text-decoration', e.target.value)}
          >
            <option value="none">None</option>
            <option value="underline">Underline</option>
            <option value="overline">Overline</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default TextSettings;