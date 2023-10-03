import { Button } from "antd";
import { useEffect } from "react";
import { TEMPLATE_PREFIX_PATH } from "configs/AppConfig";
import { useNavigate } from "react-router-dom";

interface SaveBuilderProps {
  saveTemplateLoading: boolean;
  saveUserTemplate: () => void;
}

const SaveBuilder = ({ saveTemplateLoading, saveUserTemplate }: SaveBuilderProps) => {
  const navigate = useNavigate();

  const autoSaveTemplate = () => {
    const intervalId = setInterval(() => {
      saveUserTemplate();
    }, 60000);

    return () => clearInterval(intervalId);
  }

  useEffect(() => {
    const clearAutoSave = autoSaveTemplate();

    return () => clearAutoSave(); 
  }, [saveUserTemplate]); 

  const handleExit = () => {
    navigate(TEMPLATE_PREFIX_PATH);
  }

  return (
    <div className="save-builder-container">
      <Button
        loading={saveTemplateLoading}
        onClick={saveUserTemplate}
        size="large"
      >
        {saveTemplateLoading ? "Saving" : "Save Template"}
      </Button>

      <Button
        onClick={handleExit}
        className="ms-3"
        size="large"
        danger
        type="primary"
      >
        Exit
      </Button>
    </div>
  )
}

export default SaveBuilder;
