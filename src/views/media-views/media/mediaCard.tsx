import { Button } from "antd";
import { MediaType } from "services/types/ImageUploadService";

interface MediaCardProps {
	onOpenModal: (id: string, type: string) => void;
  media?: MediaType;
}
const MediaCard = ({ onOpenModal, media }: MediaCardProps) => {
  return (
    <div className="card text-center">
      <img src={media?.url} className="card-img-top h-4" alt={media?.name} />
      <div className="card-body">
        <h5 className="card-title">{media?.name}</h5>
        <Button type="primary" onClick={() => onOpenModal(String(media?.id), 'show')}>Details</Button>
      </div>
    </div>
  )
}

export default MediaCard;