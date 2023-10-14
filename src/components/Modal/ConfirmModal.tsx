import { Button, Modal } from "antd";
import { HandleErrors } from "services/error/handleErrors";

interface ConfirmModalProps {
  title: string;
  handleConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
  continueText?: string;
  isOpen: boolean;
  errorMessage: any;
  errorMessageTitle?: string;
}

const ConfirmModal = ({ 
  handleConfirm, 
  loading = false,
  title,
  onClose,
  isOpen,
  errorMessage, 
  continueText = "continue",
  errorMessageTitle,
}: ConfirmModalProps) => {
  return (
    <Modal
      centered
      width={600}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className="p-4">
        <h5 className="text-center">Are you sure?</h5>
        <p className="text-center py-2">{title}</p>
        <div className="card-body d-flex justify-content-between mt-4">
          <Button 
            type="default" 
            onClick={onClose}
            block
            className="ml-3"
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            danger 
            block
            className="ms-3"
            loading={loading}
            onClick={handleConfirm}
          >
            {continueText}
          </Button>
        </div>
        {errorMessage &&
          <HandleErrors 
            errors={errorMessage} 
            isToast={true}
            title={errorMessageTitle}
          />
        }
      </div>
    </Modal>
  )
};

export default ConfirmModal;
