import { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useLoading } from "hooks/useLoading";
import Loading from "components/Loading";
import { HandleErrors } from "services/error/handleErrors";
import ImageUploadService from "services/ImageUploadService";
import { ERROR_MESSAGES } from "configs/AppConfig";

interface AddMediaModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddMediaModal = ({ title, isOpen = false, onClose }: AddMediaModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadImageLoading, withUploadImageLoading] = useLoading();

  const handleUploadImage = async (data: FormData) => {
      try {
        await withUploadImageLoading(ImageUploadService.uploadMedia(data));
        setErrorMessage(null);
        onClose();
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      };
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      handleUploadImage(formData);
    } else {
      message.warning("Please select a file to upload.");
    }
  };

  const handleChange = (info: any) => {
    setSelectedFile(info.file);
  };

  return (
    <Modal
      title="Upload Media"
      centered
      width={800}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="upload" disabled={uploadImageLoading || !selectedFile} type="primary" onClick={handleUpload}>
          Upload
        </Button>,
      ]}
    >
      {uploadImageLoading && <Loading />}
      {!uploadImageLoading && (
        <Upload.Dragger
          accept=".png"
          beforeUpload={() => false} 
          showUploadList={false}
          onChange={handleChange}
        >
          <p>Drag &amp; drop a Media file or click to select</p>
          <p>File selected: {selectedFile ? selectedFile.name : 'None'}</p>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload.Dragger>
      )}
      {errorMessage &&
        <HandleErrors errors={errorMessage} />
      }
    </Modal>
  )
};

export default AddMediaModal;
