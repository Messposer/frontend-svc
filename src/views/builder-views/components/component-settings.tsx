interface ComponentSettingsProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const ComponentSettings: React.FC<ComponentSettingsProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="component-container">
      <h4 className="builder-group-title text-primary">Component Settings</h4>
      <div className="builder-group">
        <h5 className="builder-group-title">Background</h5>
        <div>
          <span>Color:</span>
          {editedStyles['background-color'] && (
            <input
              type="color"
              value={editedStyles['background-color']}
              title="input-color"
              onChange={(e) => handleStyleChange('background-color', e.target.value)}
            />
          )}
        </div>
        <div>
          <span>Image:</span>
          <select
            value={editedStyles['background-image']}
            title="select-background-image"
            onChange={(e) => handleStyleChange('background-image', e.target.value)}
          >
            <option value="image1">Image 1</option>
            <option value="image2">Image 2</option>
          </select>
        </div>
      </div>

      <div className="builder-group">
        <h5 className="builder-group-title">Padding</h5>
        <div className="mb-3">
          {editedStyles['padding'] && (
            <input
              type="number"
              value={parseInt(editedStyles['padding'])}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('padding', e.target.value + 'px')}
            />
          )}
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5 className="builder-label-small">Left:</h5>
            {editedStyles['padding-left'] && (
              <input
                type="number"
                value={parseInt(editedStyles['padding-left'])}
                title="input-number"
                className="builder-input-small"
                onChange={(e) => handleStyleChange('padding-left', e.target.value + 'px')}
              />
            )}
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">Right:</h5>
            {editedStyles['padding-right'] && (
              <input
                type="number"
                value={parseInt(editedStyles['padding-right'])}
                title="input-number"
                className="builder-input-small"
                onChange={(e) => handleStyleChange('padding-right', e.target.value + 'px')}
              />
            )}
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">Top:</h5>
            {editedStyles['padding-top'] && (
              <input
                type="number"
                value={parseInt(editedStyles['padding-top'])}
                title="input-number"
                className="builder-input-small"
                onChange={(e) => handleStyleChange('padding-top', e.target.value + 'px')}
              />
            )}
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">Bottom:</h5>
            {editedStyles['padding-bottom'] && (
              <input
                type="number"
                value={parseInt(editedStyles['padding-bottom'])}
                title="input-number"
                className="builder-input-small"
                onChange={(e) => handleStyleChange('padding-bottom', e.target.value + 'px')}
              />
            )}
          </div>
        </div>
      </div>

      <div className="builder-group">
        <h5 className="builder-group-title">Border Radius</h5>
        <div className="mb-3">
          {editedStyles['border-radius'] && (
            <input
              type="number"
              value={parseInt(editedStyles['border-radius'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('border-radius', e.target.value + 'px')}
            />
          )}
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5 className="builder-label-small">TR:</h5>
            <input
              type="number"
              value={parseInt(editedStyles['border-top-right-radius'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('border-top-right-radius', e.target.value + 'px')}
            />
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">BR:</h5>
            <input
              type="number"
              value={parseInt(editedStyles['border-bottom-right-radius'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('border-bottom-right-radius', e.target.value + 'px')}
            />
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">BL:</h5>
            <input
              type="number"
              value={parseInt(editedStyles['border-bottom-left-radius'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('border-bottom-left-radius', e.target.value + 'px')}
            />
          </div>
          <div className="col-md-3">
            <h5 className="builder-label-small">TL:</h5>
            <input
              type="number"
              value={parseInt(editedStyles['border-top-left-radius'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('border-top-left-radius', e.target.value + 'px')}
            />
          </div>
        </div>
      </div>

      <div className="builder-group">
        <h5 className="builder-group-title">Height</h5>
        <div className="mb-3">
          {editedStyles['height'] && (
            <input
              type="number"
              value={parseInt(editedStyles['height'] ?? 0)}
              title="input-number"
              className="builder-input-small"
              onChange={(e) => handleStyleChange('height', e.target.value + 'px')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentSettings;