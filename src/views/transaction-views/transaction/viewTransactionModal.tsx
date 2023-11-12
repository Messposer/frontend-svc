import { Modal } from "antd";
import Loading from "components/Loading";
import MomentTime from "components/Moment";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import SubscriptionService from "services/SubscriptionService";
import { HandleErrors } from "services/error/handleErrors";
import { PaymentType } from "services/types/SubscriptionServiceType";

interface ViewTemplateModalProps {
  title: string;
  paymentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewTransactionModal = ({ title, isOpen = false, onClose, paymentId }: ViewTemplateModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionLoading, withTransactionLoading] = useLoading();
  const [payment, setPayment] = useState<PaymentType>();

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
      title="Transaction details"
    >
      <>
        {
          transactionLoading && <Loading />
        }
        {
          !transactionLoading &&
          <div className="transaction-wrapper">
            <hr />
            <h6 className="card-group-details">Transaction ID: <strong>{payment?.transaction_id}</strong></h6>
            <h6 className="card-group-details">Status: <strong>{payment?.status}</strong></h6>
            <h6 className="card-group-details">Date Created: <strong><MomentTime date={payment?.created_at ?? ""} /></strong></h6>
          </div>
        }
        {errorMessage &&
          <HandleErrors errors={errorMessage} isToast={true} />
        }
      </>
    </Modal>
  );
};

export default ViewTransactionModal;