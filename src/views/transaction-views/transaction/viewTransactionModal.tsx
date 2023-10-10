import { Button, Modal } from "antd";
import RawHTMLComponent from "components/RawHtml";
import { ERROR_MESSAGES, TEMPLATE_BUILDER_PREFIX_PATH, VIEW_TEMPLATE_TYPE } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubscriptionService from "services/SubscriptionService";
import TemplateService from "services/TemplateService";
import { AddUserToTemplateType } from "services/types/TemplateServiceType";

interface ViewTemplateModalProps {
  title: string;
  paymentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTransactionModal = ({ title, isOpen = false, onClose, paymentId }: ViewTemplateModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [templateLoading, withTransactionLoading] = useLoading();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<any>();

  const getAUserTemplate = async () => {
    if(paymentId){
      try {
        const payment = await withTransactionLoading(SubscriptionService.getPaymentDetails(paymentId));
        setPayment(payment);
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }
  }

  useEffect(() => {
    getAUserTemplate();
  },[paymentId]);

  useDocumentTitle(title);
  return(
    <Modal
      width={700}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >

    </Modal>
  );
};

export default ViewTransactionModal;