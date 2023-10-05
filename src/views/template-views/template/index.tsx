import { ERROR_MESSAGES, VIEW_TEMPLATE_TYPE } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import TemplateService from "services/TemplateService";
import { TemplateType, UserTemplateType } from "services/types/TemplateServiceType";
import TemplateCard from "./templateCard";

interface TemplateProps {
  title: string;
	onOpenModal: (id: string, type: string) => void;
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
            {userTemplates.map((template: UserTemplateType) => (
              <div key={template?.id} className="col-md-3">
                <TemplateCard viewType={VIEW_TEMPLATE_TYPE.USER} userTemplate={template} onOpenModal={onOpenModal}/>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="p-3 mt-3 bg-white templates-container">
      <h6>All Templates</h6> <hr />
        {
          allTemplates.length > 0 &&
          <div className="row">
            {allTemplates.map((template: TemplateType) => (
              <div key={template?.id} className="col-md-3">
                <TemplateCard viewType={VIEW_TEMPLATE_TYPE.SYSTEM} template={template} onOpenModal={onOpenModal}/>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default TemplateIndex;