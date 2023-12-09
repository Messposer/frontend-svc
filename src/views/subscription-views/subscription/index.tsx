import { Button } from "antd";
import UserSubscription from "components/Dashboard/UserSubscription";
import { ERROR_MESSAGES, PAYMENT_TYPE, SUBSCRIPTION_TYPE } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import SubscriptionService from "services/SubscriptionService";
import { HandleErrors } from "services/error/handleErrors";
import { AddUserSubscriptionType, SubscriptionType, UserSubscriptionType } from "services/types/SubscriptionServiceType";
interface TemplateProps {
  title: string;
};
const SubscriptionIndex = ({ title }: TemplateProps) => {
  const [userSubscription, setUserSubscription] = useState<UserSubscriptionType>();
  const [allSubscription, setAllSubscription] = useState<SubscriptionType[]>([]);
  const [allSubscriptionLoading, withAllSubscriptionLoading] = useLoading();
  const [allUserSubscriptionLoading, withUserAllSubscriptionLoading] = useLoading();
  const [addSubscriptionLoading, withAddSubscriptionLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const getSubscription = async () => {
    try {
			const subscription = await withAllSubscriptionLoading(SubscriptionService.getAllSubscription());
			setAllSubscription(subscription);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const getUserSubscription = async () => {
    try {
			const subscription = await withUserAllSubscriptionLoading(SubscriptionService.getUserSubscription());
			setUserSubscription(subscription);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const handleAddUserSubscription = async (planId: number) => {
    try {
      const addUserToPlanPayload: AddUserSubscriptionType = {
        payment_type: PAYMENT_TYPE.SUBSCRIPTION,
        planId
      }
			const subscription = await withAddSubscriptionLoading(SubscriptionService.addUserToSubscription(addUserToPlanPayload));
      window.open(subscription.authorization_url, '_blank');
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  useEffect(() => {
    getUserSubscription();
    getSubscription();
  }, [])

  useDocumentTitle(title);
  return (
    <div className='p-3 template-container'>
      <UserSubscription alt={true}/>
      <div className="p-3 mt-3 bg-white user-templates-container">
        <h6>Subscriptions</h6> <hr />
        {
          allSubscription.length > 0 &&
          <div className="row">
            {allSubscription.map((subscription: SubscriptionType) => (
              <div key={subscription?.id} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                      <h5 className="card-title text-capitalize">{ subscription?.name} Plan</h5>
                      <p className="card-text">{ subscription?.description }</p>
                      <h2>${subscription?.price}/month</h2>
                      {
                        userSubscription?.subscription?.id === subscription?.id &&
                        <h4 className="text-sub-title">You are currently subscribed to this plan</h4>
                      }
                      {
                        subscription?.name === SUBSCRIPTION_TYPE.FREE &&
                        <Button 
                          type="primary"
                          block
                          size="large"
                          disabled={true}
                        >
                          Subscribe
                        </Button>
                      }
                      {
                        subscription?.name !== SUBSCRIPTION_TYPE.FREE &&
                        <Button 
                          type="primary"
                          block
                          size="large"
                          disabled={userSubscription?.subscription?.name === SUBSCRIPTION_TYPE.PREMIUM}
                          loading={addSubscriptionLoading}
                          onClick={() => handleAddUserSubscription(subscription?.id)}
                        >
                          Subscribe
                        </Button>
                      }
                    </div>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      {errorMessage &&
        <HandleErrors 
          errors={errorMessage} 
          isToast={true}
          title="Payment Failed"
        />
      }
    </div>
  );
}

export default SubscriptionIndex;