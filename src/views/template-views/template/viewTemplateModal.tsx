import { Button, Modal } from "antd";
import RawHTMLComponent from "components/RawHtml";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TemplateService from "services/TemplateService";
import { AddUserToTemplateType, TemplateType, UserTemplateType } from "services/types/TemplateServiceType";

interface ViewTemplateModalProps {
  title: string;
  templateId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTemplateModal = ({ title, isOpen = false, onClose, templateId }: ViewTemplateModalProps) => {
	const [addUserToTemplateLoading, withAddUserToTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const [templateLoading, withTemplateLoading] = useLoading();
  const navigate = useNavigate();
  const [userTemplate, setUserTemplate] = useState<any>();

  const getAUserTemplate = async () => {
    if(templateId){
      try {
        const template = await withTemplateLoading(TemplateService.getAUserTemplate(templateId));
        setUserTemplate(template);
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }
  }

  useEffect(() => {
    getAUserTemplate();
  },[templateId]);

  const handleClick = async () => {
    try {
      const payload: AddUserToTemplateType = {
        template_id: templateId
      };
      await withAddUserToTemplateLoading(TemplateService.addUserToTemplate(payload));
      navigate(`builder/${templateId}`);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  useDocumentTitle(title);
  return(
    <Modal
      width={700}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="view-template-modal-container">
        <h5 className="text-capitalize">{userTemplate?.title ?? userTemplate?.template?.title}</h5>
        <hr />
        <RawHTMLComponent htmlContent={ userTemplate?.template_body ? userTemplate?.template_body : userTemplate?.template?.template_body || "" } />
        <Button onClick={handleClick} loading={addUserToTemplateLoading} type="primary">Open template</Button>
      </div>
    </Modal>
  );
};

export default ViewTemplateModal;