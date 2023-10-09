import React, { useState, useEffect, useRef } from "react";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import TemplateService from "services/TemplateService";
import { SaveUserToTemplateType, UserTemplateType } from "services/types/TemplateServiceType";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useParams } from "react-router-dom";
import RawHTMLComponent from "components/RawHtml";
import { disableKeyBoardEvents, getFilteredCSSProperties, parseHtmlString } from "utils/template/getElementStyle";
import { propertyListToShow } from "utils/template/styleSelected";
import StyleEditor from "../components/styleEditor";
import ElementButtons from "../components/addElement";
import ImageSettings from "../components/image-settings";
import SaveBuilder from "../components/saveBuilder";
import PerfectScrollbar from "react-perfect-scrollbar";
import 'react-perfect-scrollbar/dist/css/styles.css';
import ShowVariable from "../components/variables";
interface TemplateProps {
  title: string;
}

const TemplateBuilder = ({ title }: TemplateProps) => {
  const [userTemplate, setUserTemplate] = useState<UserTemplateType>();
  const [templateLoading, withTemplateLoading] = useLoading();
  const [saveTemplateLoading, withSaveTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [editedStyles, setEditedStyles] = useState<{ [key: string]: string }>({});
  const [showVariables, setShowVariables] = useState<boolean>(false);
  const { id } = useParams();

  useDocumentTitle(title);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const toggleShowVariable = () => setShowVariables(!showVariables);

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

  const saveUserTemplate = async () => {
    const body = document.querySelector(".template-builder-editor-wrapper");
    if (body) {
      const saveUserTemplatePayload: SaveUserToTemplateType = {
        template_body: body.innerHTML,
        template_id: userTemplate?.id
      };
      try {
        await withSaveTemplateLoading(TemplateService.saveUserTemplate(saveUserTemplatePayload));
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }
  }

  const handleAddElement = (
    styles: React.CSSProperties[],
    existingElementString: string
  ) => {
    if (showVariables) {
      toggleShowVariable();
    }
    if (
      !userTemplate ||
      !userTemplate.template_body ||
      !contentEditableRef.current
    )
      return;
  
    const parser = new DOMParser();
    const existingElement = parseHtmlString(existingElementString);
    if (!existingElement) return;
  
    const doc = parser.parseFromString(
      userTemplate.template_body,
      "text/html"
    );
  
    const newElement = existingElement.cloneNode(true) as HTMLElement;
  
    styles.forEach((style) => {
      for (const [property, value] of Object.entries(style)) {
        newElement.style[property as any] = value;
      }
    });
  
    const wrapper = contentEditableRef.current;
  
    if (!wrapper.innerHTML.trim()) {
      // If .template-builder-editor-wrapper is empty, append the new element inside it
      wrapper.appendChild(newElement);
    } else {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
  
      if (
        range &&
        wrapper.contains(range.commonAncestorContainer) &&
        (range.commonAncestorContainer as HTMLElement).classList.contains(
          "template-builder-editor-wrapper"
        )
      ) {
        // Only insert the new element if the commonAncestorContainer is the .template-builder-editor-wrapper
        (range.commonAncestorContainer as HTMLElement).appendChild(newElement);
      }
    }
  
    const updatedHTML = new XMLSerializer().serializeToString(doc);
    setUserTemplate((prevUserTemplate: any) => ({
      ...prevUserTemplate,
      template_body: updatedHTML,
    }));
  };    

  const applyEditedStyles = (element: HTMLElement, editedStyles: { [key: string]: string }) => {
    for (const [property, value] of Object.entries(editedStyles)) {
      element.style.setProperty(property, value);
    }
  };

  const handleElementClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(showVariables){
      toggleShowVariable();
    }
    const clickedElement = e.target as HTMLElement;

    if (selectedElement) {
      selectedElement.style.border = ''; 
    }
    clickedElement.style.border = '2px solid red';

    setSelectedElement(clickedElement);
    const cssProperties = getFilteredCSSProperties(clickedElement, propertyListToShow);
    setEditedStyles(cssProperties);
  }

  const deSelectElement = () => {
    if(showVariables){
      toggleShowVariable();
    }
    if (selectedElement) {
      selectedElement.style.border = ''; 
      setSelectedElement(null);
    }
  }

  const handleDeleteElement = () => {
    if(showVariables){
      toggleShowVariable();
    }
    if (selectedElement && selectedElement.parentElement) {
      if (selectedElement.classList.contains("template-builder-editor-wrapper")) {
        return; // Do nothing if it's the wrapper element
      }  
      if (selectedElement) {
        applyEditedStyles(selectedElement, editedStyles);
        setSelectedElement(null);
        setEditedStyles({});
      }
      selectedElement.parentElement.removeChild(selectedElement);
    }
  }

  const handleStyleChange = (property: any, value: any) => {
    setEditedStyles(prevStyles => ({
      ...prevStyles,
      [property]: value
    }));
  
    if (selectedElement) {
      selectedElement.style.setProperty(property, value);
    }
  };

  useEffect(() => {
    getAUserTemplate();
  }, []);

  return (
    <div className="template-builder-container">
      <SaveBuilder
        saveTemplateLoading={saveTemplateLoading}
        saveUserTemplate={saveUserTemplate}
      />
      <div className="m-0 row mt-3">
        <div className="col-md-1">
          <PerfectScrollbar style={{height: '91vh'}}>
            <ElementButtons
              toggleShowVariable={toggleShowVariable} 
              handleAddElement={handleAddElement} 
              handleDeleteElement={handleDeleteElement} 
              deSelectElement={deSelectElement}
            />
          </PerfectScrollbar>
        </div>
        <div className="col-md-8 p-0">
          <PerfectScrollbar style={{height: '91vh'}}>
            {userTemplate && (
              <div 
                className="template-builder-editor-wrapper" 
                contentEditable 
                ref={contentEditableRef}
                onClick={handleElementClick}
                dangerouslySetInnerHTML={{ __html: userTemplate?.template_body||"" }}
                onKeyPress={(e) => disableKeyBoardEvents(e, "Enter")}
              />
            )}
          </PerfectScrollbar>
        </div>
        <div className="col-md-3">
          <PerfectScrollbar style={{height: '91vh'}}>
            {
              showVariables &&
              <ShowVariable 
                toggleShowVariable={toggleShowVariable}
                userTemplate={userTemplate}
              />
            }
            {
              !showVariables && 
              <>
                <ImageSettings 
                  clickedElement={selectedElement} 
                />
                <StyleEditor 
                  editedStyles={editedStyles} 
                  handleStyleChange={handleStyleChange} 
                />
              </>
            }
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default TemplateBuilder;
