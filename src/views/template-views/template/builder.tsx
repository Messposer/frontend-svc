import { useDocumentTitle } from "hooks/useDocumentTitle";
import React, { useEffect, useState } from "react";
import ButtonElement from "./Elements/ButtonElement";
import PictureElement from "./Elements/PictureElement";
import ParagraphElement from "./Elements/ParagraphElement";
import VariableElement from "./Elements/VariableElement";
import ReactDOMServer from 'react-dom/server'; 
import { useLoading } from "hooks/useLoading";
import TemplateService from "services/TemplateService";
import { UserTemplateType } from "services/types/TemplateServiceType";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useParams } from "react-router-dom";
import RawHTMLComponent from "components/RawHtml";

interface TemplateProps {
  title: string;
  onOpenModal: (id: string) => void;
}

const TemplateBuilder = ({title, onOpenModal}: TemplateProps) => {
  const [template, setTemplate] = useState<any>([]);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [userTemplate, setUserTemplate] = useState<UserTemplateType>();
  const [templateLoading, withTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  useDocumentTitle(title);

  const handleElementClick = (element: any) => {
    setSelectedElement(element);
  };

  const handleDeselectElement = () => {
    setSelectedElement(null);
  };

  const handleInsertNewTag = (tag: string) => {
    if (selectedElement) {
      const elementClone = React.cloneElement(selectedElement, {}, [tag, selectedElement.props.children]);
      setTemplate(template.map((el: any) => el === selectedElement ? elementClone : el));
    }
  };

  const generateHtml = () => {
    return ReactDOMServer.renderToString(<div>{template}</div>);
  };

  const getAUserTemplate = async () => {
    try {
      const template = await withTemplateLoading(TemplateService.getAUserTemplate(id));
      setUserTemplate(template);

      // Add the template elements to the builder
      setTemplate(template.template_body ? [template.template_body] : []);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
    }
  }

  const handleAddButton = () => {
    setTemplate([...template, <ButtonElement key={Date.now()} />]);
  };

  const handleAddPicture = () => {
    setTemplate([...template, <PictureElement key={Date.now()} />]);
  };

  const handleAddParagraph = () => {
    setTemplate([...template, <ParagraphElement key={Date.now()} />]);
  };

  const handleAddVariable = () => {
    const variable = prompt('Enter variable name:');
    if (variable) {
      setTemplate([...template, <VariableElement key={Date.now()} variable={variable} />]);
    }
  };

  useEffect(() => {
    getAUserTemplate();
  }, []);

  return (
    <div className="template-builder-container">
      <button onClick={() => alert(generateHtml())}>Generate HTML</button>
      <div className="mx-2 row">
        <div className="col-md-2">
          <button onClick={handleAddButton}>Add Button</button>
          <button onClick={handleAddPicture}>Add Picture</button>
          <button onClick={handleAddParagraph}>Add Paragraph</button>
          <button onClick={handleAddVariable}>Add Variable</button>
        </div>

        <div className="col-md-7">
          {template.map((element: any, index: any) => (
            <div key={index} onClick={() => handleElementClick(element)}>
              <RawHTMLComponent htmlContent={element || ''} />
            </div>
          ))}
        </div>

        <div className="col-md-3">
          <button onClick={handleDeselectElement}>Deselect Element</button>
          <input 
            type="text" 
            placeholder="Enter new tag" 
            onChange={(e) => handleInsertNewTag(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;
