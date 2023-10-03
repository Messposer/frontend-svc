import { useLoading } from "hooks/useLoading";
import React, { useEffect, useState } from "react";
import ImageUploadService from "services/ImageUploadService";

interface EditElementProps {
  clickedElement: HTMLElement | null;
}

const EditElement = ({ clickedElement }: EditElementProps) => {
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [newSrc, setNewSrc] = useState<string>("");
  const [uploadImageLoading, withUploadImageLoading] = useLoading();

  useEffect(() => {
    if (clickedElement) {
      const tagName = clickedElement.tagName.toLowerCase();
      setSelectedElement(tagName);
    }
  }, [clickedElement]);

  const handleSrcInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageURL = e.target.value;
    setNewSrc(imageURL);
    if (clickedElement && clickedElement instanceof HTMLImageElement) {
      clickedElement.src = imageURL;
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        const cloudinaryUrl = await withUploadImageLoading(ImageUploadService.uploadImage(formData));
        console.log(cloudinaryUrl);

        setNewSrc(cloudinaryUrl);

        if (clickedElement && clickedElement instanceof HTMLImageElement) {
          clickedElement.src = cloudinaryUrl;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h4>{selectedElement}</h4>
      {selectedElement === "img" && (
        <div>
          <input
            type="file"
            accept="image/*"
            placeholder="Select image"
            onChange={handleUploadImage}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newSrc}
            onChange={handleSrcInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default EditElement;
