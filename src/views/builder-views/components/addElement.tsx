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
      <Button 
        type="primary" 
        size={size} 
        style={buttonStyle}
        onClick={() => handleAddElement([defaultTextStyles], "<h5>Text</h5>")}
      >
        <FontSizeOutlined style={{ fontSize: '24px' }} />
      </Button>
      <Button 
        type="primary" 
        size={size} 
        style={buttonStyle}
        onClick={() => handleAddElement([defaultButtonStyles], "<div className='button-wrapper'><button>Button</button></div>")}
      >
        <FolderAddOutlined style={{ fontSize: '24px' }} />
      </Button>
      <Button 
        type="primary" 
        size={size} 
        style={buttonStyle}
        onClick={() => handleAddElement([defaultImageStyles], "<img src='https://placehold.co/600x400' />")}
      >
        <FileImageOutlined style={{ fontSize: '24px' }} />
      </Button>
      <Button 
        type="primary" 
        size={size} 
        style={buttonStyle}
        onClick={() => deSelectElement()}
      >
        Deselect
      </Button>
      <Button 
        type="primary" 
        size={size} 
        style={buttonStyle}
        onClick={() => toggleShowVariable()}
      >
        Variables
      </Button>
      <Button 
        type="primary"
        danger 
        size={size} 
        style={buttonStyle}
        onClick={handleDeleteElement}
      >
        <DeleteOutlined style={{ fontSize: '24px' }} />
      </Button>
    </>
  );
};

export default ElementButtons;
