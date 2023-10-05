import { useEffect, useState } from "react";
import { Modal } from "antd";
import { HandleErrors } from "services/error/handleErrors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { ScheduledType } from "redux/types";
import ScheduleService from "services/ScheduleService";
import { useLoading } from "hooks/useLoading";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useNavigate } from "react-router-dom";

interface ViewMediaModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  mediaId: string | null,
}

const ViewMediaModal = ({title, isOpen = false, onClose, mediaId}: ViewMediaModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
	const [media, setMedia] = useState<ScheduledType>();
  const navigate = useNavigate();
  useDocumentTitle(title);

  const getMedia = async () => {
		try {
			const media = await withLoading(ScheduleService.getSchedule(mediaId));
			setMedia(media);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  useEffect(() => {
    if(mediaId){
      getMedia();
    }
  }, [mediaId]);

  return (
    <Modal
      width={1200}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="row">
      </div>
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default ViewMediaModal;
