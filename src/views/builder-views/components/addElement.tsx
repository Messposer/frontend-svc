import { Button } from "antd";
import { FontSizeOutlined, FileImageOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';

interface ElementButtonsProps {
  handleAddElement: (styles: React.CSSProperties[], existingElementString: string) => void;
  handleDeleteElement: () => void;
  deSelectElement: () => void;
  toggleShowVariable: () => void;
}

const defaultImageStyles = {
  width: "100%",
  height: "100%",
};

const defaultButtonStyles = {
  display: "flex",
  justifyContent: "center",
};

const defaultTextStyles = {
  fontSize: "16px",
  padding: "20px 0px",
  backgroundColor: "#fff",
  color: "#999",
  border: "none"
};

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100px',
  marginBottom: '10px', 
  padding: '10px 0px',
  height: '50px'
};

const size = "large";

const ElementButtons: React.FC<ElementButtonsProps> = ({ 
  toggleShowVariable, 
  deSelectElement, 
  handleAddElement, 
  handleDeleteElement 
}) => {
  return (
    <>
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2 mt-2" 
        onClick={() => handleAddElement([defaultTextStyles], "<h5>Text</h5>")}
      >
        <div 
          className="addElementIcon"
        >
          <FontSizeOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Text
        </div>
      </div>
      
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2" 
        onClick={() => handleAddElement([defaultButtonStyles], "<button>Button</button>")}
      >
        <div 
          className="addElementIcon"
        >
          <FolderAddOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Button
        </div>
      </div>
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2" 
        onClick={() => handleAddElement([defaultImageStyles], "<img src='https://placehold.co/600x400' />")}
      >
        <div 
          className="addElementIcon"
        >
          <FileImageOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Image
        </div>
      </div>
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2" 
        onClick={() => deSelectElement()}
      >
        <div 
          className="addElementIcon"
        >
          <FileImageOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Deselect
        </div>
      </div>
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2" 
        onClick={() => toggleShowVariable()}
      >
        <div 
          className="addElementIcon"  
        >
          <FileImageOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Variables
        </div>
      </div>
      <div
        className="addElementWrapper text-center px-2 py-3 mb-2" 
        onClick={handleDeleteElement}
      >
        <div 
          className="addElementIcon"
        >
          <DeleteOutlined style={{ fontSize: '16px' }} />
        </div>
        <div 
          className="addElementText pt-2"
        >
          Delete
        </div>
      </div>
    </>
  );
};

export default ElementButtons;
