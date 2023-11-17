import React, { useState, useEffect, useRef } from "react";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import TemplateService from "services/TemplateService";
import { SaveUserToTemplateType, UserTemplateType } from "services/types/TemplateServiceType";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useParams } from "react-router-dom";
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

const TemplateBuilder: React.FC<TemplateProps> = ({ title }) => {
  const [userTemplate, setUserTemplate] = useState<UserTemplateType>();
  const [templateLoading, withTemplateLoading] = useLoading();
  const [saveTemplateLoading, withSaveTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [editedStyles, setEditedStyles] = useState<{ [key: string]: string }>({});
  const [showVariables, setShowVariables] = useState<boolean>(false);
  const [dropIndicatorPosition, setDropIndicatorPosition] = useState<number | null>(null);
  const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const { id } = useParams();

  useDocumentTitle(title);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const toggleShowVariable = () => setShowVariables(!showVariables);

  const getAUserTemplate = async () => {
    try {
      const template = await withTemplateLoading(TemplateService.getAUserTemplate(id));
      setUserTemplate(template);
      saveToHistory();
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
    }
  };

  const saveToHistory = () => {
    const body = document.querySelector(".template-builder-editor-wrapper");
    if (body) {
      const currentHTML = body.innerHTML;
      setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, currentStep + 1);
        return [...newHistory, currentHTML];
      });
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const saveUserTemplate = async () => {
    const body = document.querySelector(".template-builder-editor-wrapper");
    if (body) {
      const saveUserTemplatePayload: SaveUserToTemplateType = {
        template_body: body.innerHTML,
        template_id: userTemplate?.id
      };
      try {
        await withSaveTemplateLoading(TemplateService.saveUserTemplate(saveUserTemplatePayload));
        saveToHistory();
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }
  };

  const insertAfter = (newNode: Node, referenceNode: Node) => {
    referenceNode.parentNode?.insertBefore(newNode, referenceNode.nextSibling);
  };

  const handleAddElement = (
    styles: React.CSSProperties[],
    existingElementString: string,
    targetElement?: HTMLElement | null
  ) => {
    if (showVariables) {
      toggleShowVariable();
    }
    if (!userTemplate || !userTemplate.template_body || !contentEditableRef.current) {
      return;
    }

    const parser = new DOMParser();
    const existingElement = parseHtmlString(existingElementString);
    if (!existingElement) return;

    const doc = parser.parseFromString(userTemplate.template_body, "text/html");

    const newElement = existingElement.cloneNode(true) as HTMLElement;

    styles.forEach((style) => {
      for (const [property, value] of Object.entries(style)) {
        newElement.style[property as any] = value;
      }
    });

    const wrapper = contentEditableRef.current;

    const newContentWrapper = document.createElement("div"); // Create a new wrapper
    newContentWrapper.appendChild(newElement);

    if (targetElement && wrapper.contains(targetElement)) {
      insertAfter(newContentWrapper, targetElement);
    } else {
      wrapper.appendChild(newContentWrapper);
    }

    const updatedHTML = new XMLSerializer().serializeToString(doc);
    setUserTemplate((prevUserTemplate: any) => ({
      ...prevUserTemplate,
      template_body: updatedHTML,
    }));
    saveToHistory();
  };

  const applyEditedStyles = (element: HTMLElement, editedStyles: { [key: string]: string }) => {
    for (const [property, value] of Object.entries(editedStyles)) {
      element.style.setProperty(property, value);
    }
  };

  const handleElementClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (showVariables) {
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
  };

  const deSelectElement = () => {
    if (showVariables) {
      toggleShowVariable();
    }
    if (selectedElement) {
      selectedElement.style.border = '';
      setSelectedElement(null);
    }
  };

  const handleDeleteElement = () => {
    if (showVariables) {
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
      saveToHistory();
    }
  };

  const handleStyleChange = (property: any, value: any) => {
    setEditedStyles(prevStyles => ({
      ...prevStyles,
      [property]: value
    }));

    if (selectedElement) {
      selectedElement.style.setProperty(property, value);
      saveToHistory();
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setDropIndicatorPosition(e.clientY);
    setDraggedElement(e.target as HTMLElement);
    console.log(e)
  };

  const handleDragLeave = () => {
    setDropIndicatorPosition(null);
    setDraggedElement(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const elementString = e.dataTransfer.getData("element");
    const elementStyles = e.dataTransfer.getData("styles");

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const targetElement = document.elementFromPoint(mouseX, mouseY) as HTMLElement;

    handleAddElement([JSON.parse(elementStyles)], elementString, targetElement);
    setDropIndicatorPosition(null);
    setDraggedElement(null);
  };

  const undo = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep: number) => prevStep - 1);
      setUserTemplate((prevUserTemplate: UserTemplateType | undefined) => {
        const updatedTemplate: UserTemplateType = {
          ...(prevUserTemplate || {}),
          id: prevUserTemplate?.id || 0, // Replace 0 with a default value if needed
          template_body: history[currentStep - 1],
        };
        return updatedTemplate;
      });
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep((prevStep: number) => prevStep + 1);
      setUserTemplate((prevUserTemplate: UserTemplateType | undefined) => {
        const updatedTemplate: UserTemplateType = {
          ...(prevUserTemplate || {}),
          id: prevUserTemplate?.id || 0, // Replace 0 with a default value if needed
          template_body: history[currentStep + 1],
        };
        return updatedTemplate;
      });
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
        undo={undo}
        redo={redo}
        history={history}
        currentStep={currentStep}
      />
      <div className="m-0 row">
        <div className="col-md-1 m-0 addElementSectionWrapper">
          <PerfectScrollbar style={{ height: '91.5vh' }}>
            <ElementButtons
              toggleShowVariable={toggleShowVariable}
              handleAddElement={handleAddElement}
              handleDeleteElement={handleDeleteElement}
              deSelectElement={deSelectElement}
            />
          </PerfectScrollbar>
        </div>
        <div
          className="col-md-8 addElementSectionWrapper m-0 p-0 template-builder-editor-dropzone"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {userTemplate && (
            <>
              {dropIndicatorPosition !== null && draggedElement && (
                <div
                  className="drop-indicator"
                  style={{
                    top: dropIndicatorPosition + 'px',
                    left: draggedElement.offsetLeft + 'px',
                    width: draggedElement.offsetWidth + 'px',
                  }}
                ></div>
              )}
              <div
                className="template-builder-editor-wrapper"
                contentEditable
                ref={contentEditableRef}
                onClick={handleElementClick}
                dangerouslySetInnerHTML={{ __html: userTemplate?.template_body || "" }}
                onKeyPress={(e) => disableKeyBoardEvents(e, "Enter")}
              />
            </>
          )}
        </div>
        <div className="col-md-3 addElementSectionWrapper m-0">
          <PerfectScrollbar style={{ height: '91vh' }}>
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