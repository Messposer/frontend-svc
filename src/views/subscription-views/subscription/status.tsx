import { Button, Card } from "antd";
import Loading from "components/Loading";
import { ERROR_MESSAGES, PAYMENT_STATUS, SUBSCRIPTION_PREFIX_PATH } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionService from "services/SubscriptionService";
import { HandleErrors } from "services/error/handleErrors";
import { PaymentType } from "services/types/SubscriptionServiceType";
import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface TemplateProps {
  title: string;
};
const SubscriptionStatus = ({ title }: TemplateProps) => {
  const [allSubscriptionLoading, withAllSubscriptionLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);
  const [payment, setPayment] = useState<PaymentType>();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  const getSubscriptionStatus = async () => {
    try {
			const payment = await withAllSubscriptionLoading(SubscriptionService.getPaymentStatus(reference));
      setPayment(payment);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  useEffect(() => {
    getSubscriptionStatus();
  }, [])

  useDocumentTitle(title);

  const renderIcon = () => {
    if (payment?.status === PAYMENT_STATUS.SUCCESS) {
      return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '48px' }} />;
    } else if (payment?.status === PAYMENT_STATUS.FAILED) {
        return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '48px' }} />;
    } else if (payment?.status === PAYMENT_STATUS.PENDING) {
        return <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '48px' }} />;
    }
  }
  return (
    <div className='p-3 template-container'>
      {
        allSubscriptionLoading && <Loading />
      }
      {
        !allSubscriptionLoading && payment &&
        <div className="d-flex justify-content-center">
          <Card style={{ width: 700 }}>
              <div className="text-center">
                  {renderIcon()}
                  <h5 className="my-4">
                    {payment?.status === PAYMENT_STATUS.SUCCESS ? 'Payment Successful' : 
                    payment?.status === PAYMENT_STATUS.FAILED ? 'Payment Failed' : 
                    payment?.status === PAYMENT_STATUS.PENDING ? 'Payment Pending' : ''}
                  </h5>
                  <Button 
                    type="primary"
                    block
                    size="large"
                    onClick={() => navigate(SUBSCRIPTION_PREFIX_PATH)}
                  >
                    Continue
                  </Button>
              </div>
          </Card>
        </div>
      }
      {errorMessage &&
        <HandleErrors 
          errors={errorMessage} 
          isToast={true}
        />
      }
    </div>
  );
}

export default SubscriptionStatus;