import { Button } from "antd";
import ConfirmModal from "components/Modal/ConfirmModal";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useLoading } from "hooks/useLoading";
import { useState } from "react";
import ImageUploadService from "services/ImageUploadService";
import { MediaType } from "services/types/ImageUploadService";

interface MediaCardProps {
	onOpenModal: (id: string, type: string) => void;
  media?: MediaType;
}
const MediaCard = ({ onOpenModal, media }: MediaCardProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [showModal, setShowModal] = useState<boolean>(false);

  const cardStyle = {
    backgroundImage: `url(${media?.url})`,
    height: 200,
    backgroundSize: 'cover',
  }

  const toggleShowModal = () => {
    setShowModal(!showModal);
    setErrorMessage(null);
  };

  const handleDeleteMedia = async () => {
		try {
			await withLoading(ImageUploadService.deleteMedia(media?.id));
      toggleShowModal();
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  return (
    <div className="card text-center">
      <div className="media-card" style={cardStyle}></div>
      <div className="card-body d-flex justify-content-between">
        <Button 
          type="primary" 
          onClick={() => onOpenModal(String(media?.id), 'show')}
        >
          Details
        </Button>
        <Button 
          type="primary" 
          danger 
          onClick={toggleShowModal}
        >
          Delete
        </Button>
      </div>
      {
        showModal &&
        <ConfirmModal 
          title="The selected media will be deleted, which might after your existing templates"
          loading={loading} 
          handleConfirm={handleDeleteMedia}
          isOpen={showModal}
          onClose={toggleShowModal}
          errorMessage={errorMessage}
          continueText="Yes, delete"
          errorMessageTitle="Error, deleting file"
        />
      }
    </div>
  )
}

export default MediaCard;