import { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { useLoading } from "hooks/useLoading";
import ContactService from "services/ContactService";
import Loading from "components/Loading";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { HandleErrors } from "services/error/handleErrors";
import { toast } from 'sonner';

interface UploadCSVModalProps {
  showCsvModal: boolean;
  toggleUploadCsvModal: () => void;
  getContacts: () => void;
}

const UploadCSVModal = ({ showCsvModal = false, toggleUploadCsvModal, getContacts }: UploadCSVModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, withLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const uploadCSV = async (data: FormData) => {
    try {
      await withLoading(ContactService.bulkUpload(data));
      toast.success("File uploaded successfully!");
      toggleUploadCsvModal();
      getContacts();
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      uploadCSV(formData);
    } else {
      message.warning("Please select a file to upload.");
    }
  };

  const handleChange = (info: any) => {
    setSelectedFile(info.file);
  };

  return (
    <Modal
      title="Upload CSV"
      centered
      open={showCsvModal}
      onCancel={toggleUploadCsvModal}
      footer={[
        <Button key="cancel" onClick={toggleUploadCsvModal}>
          Cancel
        </Button>,
        <Button key="upload" disabled={loading || !selectedFile} type="primary" onClick={handleUpload}>
          Upload
        </Button>,
      ]}
    >
      {loading && <Loading />}
      {!loading && (
        <Upload.Dragger
          accept=".csv"
          beforeUpload={() => false} 
          showUploadList={false}
          onChange={handleChange}
        >
          <p>Drag &amp; drop a CSV file or click to select</p>
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

export default UploadCSVModal;
