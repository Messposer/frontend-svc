import React, { useState, useEffect, useRef } from "react";
import { useDocumentTitle } from "hooks/useDocumentTitle";
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

const TemplateBuilder = ({ title, onOpenModal }: TemplateProps) => {
  const [userTemplate, setUserTemplate] = useState<UserTemplateType>();
  const [templateLoading, withTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  useDocumentTitle(title);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const getAUserTemplate = async () => {
    try {
      const template = await withTemplateLoading(TemplateService.getAUserTemplate(id));
      setUserTemplate(template);
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
    }
  }

  const handleAddElement = (elementType: string) => {
    if (!userTemplate || !userTemplate.template_body || !contentEditableRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(userTemplate.template_body, "text/html");
    const newElement = document.createElement(elementType);

    // Customize the new element (e.g., set attributes, innerHTML, etc.)
    // For example, if elementType is "button":
    // newElement.innerHTML = "Click Me";

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (range) {
      range.insertNode(newElement);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    const updatedHTML = new XMLSerializer().serializeToString(doc);
    setUserTemplate((prevUserTemplate: any) => ({
      ...prevUserTemplate,
      template_body: updatedHTML
    }));
  };

  useEffect(() => {
    getAUserTemplate();
  }, []);

  return (
    <div className="template-builder-container">
      <button onClick={() => alert(userTemplate?.template_body)}>Generate HTML</button>
      <div className="mx-2 row">
        <div className="col-md-3">
          <button onClick={() => handleAddElement("button")}>Add Button</button>
          <button onClick={() => handleAddElement("img")}>Add Picture</button>
          <button onClick={() => handleAddElement("p")}>Add Paragraph</button>
          {/* Add more buttons as needed */}
        </div>
        {userTemplate && (
          <div className="col-md-9" contentEditable ref={contentEditableRef}>
            <RawHTMLComponent htmlContent={userTemplate?.template_body || ''} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateBuilder;
