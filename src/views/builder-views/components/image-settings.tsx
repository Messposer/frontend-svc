import { Button } from "antd";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import ImageUploadService from "services/ImageUploadService";
import { MediaType } from "services/types/ImageUploadService";
import MediaCard from "views/media-views/media/mediaCard";

interface ImageSettingsProps {
  clickedElement: HTMLElement | null;
}

const ImageSettings = ({ clickedElement }: ImageSettingsProps) => {
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [media, setMedia] = useState<MediaType[]>([]);
  const [allMediaLoading, withAllMediaLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

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

  useEffect(() => {
    if (clickedElement) {
      const tagName = clickedElement.tagName.toLowerCase();
      setSelectedElement(tagName);
    }
  }, [clickedElement]);

  const handleUploadImage = async (url: string) => {
    if (clickedElement && clickedElement instanceof HTMLImageElement) {
      clickedElement.src = url;
    }
  };

  const cardStyle = (media: MediaType) => {
    return {
      backgroundImage: `url(${media?.url})`,
      height: 50,
      backgroundSize: 'cover',
    }
  }

  return (
    <div className="component-container">
      <h4>{selectedElement}</h4>
      {selectedElement === "img" && (
        <div className="builder-group">
          <div className="builder-user-images-container">
            <h4 className="builder-group-title text-primary">My Media</h4>
            <hr />
            {
              media.length > 0 &&
              <div className="row m-0">
                {media.map((media: MediaType) => (
                  <div key={media?.id} className="col-md-4 p-0">
                    <div className="card text-center">
                      <div className="media-card" style={cardStyle(media)}></div>
                      <div className="d-flex justify-content-center py-2">
                        <Button type="primary" onClick={() => handleUploadImage(media?.url)}>Use</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSettings;
