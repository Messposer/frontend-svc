import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useState } from "react";
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
  const [userTemplate, setUserTemplate] = useState<UserTemplateType>();
  const [templateLoading, withTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  useDocumentTitle(title);

  const generateHtml = () => {
    return ReactDOMServer.renderToString(<div>{template}</div>);
  };

  const getAUserTemplate = async () => {
    try {
      const template = await withTemplateLoading(TemplateService.getAUserTemplate(id));
      setUserTemplate(template);
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

  console.log(userTemplate)
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
        {
          userTemplate &&
          <div className="col-md-7">
            <RawHTMLComponent htmlContent={userTemplate?.template_body || ''} />
          </div>
        }

        <div className="col-md-3">

        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;
