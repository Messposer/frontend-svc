import { Button } from "antd";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import TemplateService from "services/TemplateService";
import { TemplateType, UserTemplateType } from "services/types/TemplateServiceType";

interface TemplateProps {
  title: string;
	onOpenModal: (id: string) => void;
};
const TemplateIndex = ({ title, onOpenModal }: TemplateProps) => {
  const [userTemplates, setUserTemplates] = useState<UserTemplateType[]>([]);
  const [allTemplates, setAllTemplates] = useState<TemplateType[]>([]);
  const [allTemplateLoading, withAllTemplateLoading] = useLoading();
  const [allUserTemplateLoading, withUserAllTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const getUserTemplates = async () => {
    try {
			const templates = await withUserAllTemplateLoading(TemplateService.getAllUserTemplates());
			setUserTemplates(templates);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const getAllTemplates = async () => {
    try {
			const templates = await withAllTemplateLoading(TemplateService.getAllTemplate());
			setAllTemplates(templates);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  useEffect(() => {
    getAllTemplates();
    getUserTemplates();
  }, [])

  useDocumentTitle(title);
  return (
    <div className='p-3 template-container'>
      <h4>Templates</h4>
      <div className="p-3 mt-3 bg-white user-templates-container">
        <h6>My Templates</h6> <hr />
        {
          userTemplates.length > 0 &&
          <div className="row">
            <div>
              {userTemplates.map((template: UserTemplateType) => (
                <div key={template?.id}>
                  <h6>{template?.template?.title}</h6>
                  <Button role="button" type="primary" onClick={() => onOpenModal(String(template?.template?.id))}>Details</Button>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
      <div className="p-3 mt-3 bg-white templates-container">
      <h6>All Templates</h6> <hr />
        {
          allTemplates.length > 0 &&
          <div className="row">
            <div>
              {allTemplates.map((template: TemplateType) => (
                <div key={template?.id}>
                  <h6>{template?.title}</h6>
                  <Button role="button" type="primary" onClick={() => onOpenModal(String(template?.id))}>Details</Button>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default TemplateIndex;