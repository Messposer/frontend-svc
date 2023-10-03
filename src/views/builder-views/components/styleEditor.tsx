interface StyleEditorProps {
  editedStyles: { [key: string]: string };
  handleStyleChange: (property: string, value: string) => void;
}

const StyleEditor: React.FC<StyleEditorProps> = ({ editedStyles, handleStyleChange }) => {
  return (
    <div className="col-md-3">
      {Object.entries(editedStyles).map(([property, value]) => (
        <div key={property}>
          <span>{property}:</span>
          {property === 'color' || property === 'background-color' ? (
            <input
              type="color"
              value={value}
              title="input-color"
              onChange={(e) => handleStyleChange(property, e.target.value)}
            />
          ) : property === 'font-size' ||
            property === 'line-height' ||
            property === 'padding' ||
            property === 'margin' ||
            property === 'margin-left' ||
            property === 'margin-right' ||
            property === 'margin-bottom' ||
            property === 'margin-top' ||
            property === 'padding-left' ||
            property === 'padding-right' ||
            property === 'padding-bottom' ||
            property === 'padding-top' ||
            property === 'border-radius' ||
            property === 'opacity' ? (
            <input
              type="range"
              title="input-number"
              value={parseInt(value)}
              onChange={(e) => handleStyleChange(property, e.target.value + 'px')}
            />
          ) : property === 'text-align' ? (
            <select
              value={value}
              title="select-align"
              onChange={(e) => handleStyleChange(property, e.target.value)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          ) : property === 'transition' || property === 'box-shadow' ? (
            <textarea
              title="input-transition"
              value={value}
              onChange={(e) => handleStyleChange(property, e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Enter your style"
              value={value}
              onChange={(e) => handleStyleChange(property, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StyleEditor;
