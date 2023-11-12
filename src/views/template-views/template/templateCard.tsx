import { Button } from "antd";
import { VIEW_TEMPLATE_TYPE } from "configs/AppConfig";
import { TemplateType, UserTemplateType } from "services/types/TemplateServiceType";

interface TemplateCardProps {
	onOpenModal: (id: string, type: string) => void;
  userTemplate?: UserTemplateType;
  template?: TemplateType;
  viewType: string;
}
const TemplateCard = ({ onOpenModal, userTemplate, template, viewType }: TemplateCardProps) => {
  const cardStyle = {
    backgroundImage: `url(${template ? template?.preview_img_link : userTemplate?.template?.preview_img_link})`,
    height: 200,
    backgroundSize: 'cover',
  }
  return (
    <div className="card text-center">
      <div className="media-card" style={cardStyle}></div>
      <div className="card-body">
        {
          viewType === VIEW_TEMPLATE_TYPE.USER &&
          <>
            <h5 className="text-sub-title">{userTemplate?.template?.title}</h5>
            <Button type="primary" onClick={() => onOpenModal(String(userTemplate?.template?.id), VIEW_TEMPLATE_TYPE.USER)}>Details</Button>
          </>
        }
        {
          viewType === VIEW_TEMPLATE_TYPE.SYSTEM &&
          <>
            <h5 className="text-sub-title">{template?.title}</h5>
            <Button type="primary" onClick={() => onOpenModal(String(template?.id), VIEW_TEMPLATE_TYPE.SYSTEM)}>Details</Button>
          </>
        }
      </div>
    </div>
  )
}

export default TemplateCard;