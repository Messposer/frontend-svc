import { ERROR_MESSAGES } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import ImageUploadService from "services/ImageUploadService";
import { MediaType } from "services/types/ImageUploadService";
import MediaCard from "./mediaCard";
import { Button } from "antd";

interface MediaProps {
	title: string,
	onOpenModal: (id: string, type: string) => void,
}

const Media = ({title, onOpenModal}: MediaProps) => {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allMediaLoading, withAllMediaLoading] = useLoading();

  const getUserMedia = async () => {
    try {
			const media = await withAllMediaLoading(ImageUploadService.getUserMedia());
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
    getUserMedia();
  }, [])

  useDocumentTitle(title);
  return (
    <div className='p-3 media-container'>
			<Button 
        onClick={() => onOpenModal('MEDIA', 'add')} 
        type="primary" 
        className="my-2"
        size="large"
      >
        Upload new media
      </Button>
      <div className="p-3 mt-3 bg-white user-templates-container">
        <h6>My Media</h6> <hr />
        {
          media.length > 0 &&
          <div className="row">
            {media.map((media: MediaType) => (
              <div key={media?.id} className="col-md-3">
                <MediaCard media={media} onOpenModal={onOpenModal} />
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default Media;