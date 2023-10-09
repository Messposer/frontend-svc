import { Button } from "antd";
import UserSubscription from "components/Dashboard/UserSubscription";
import { ERROR_MESSAGES, SUBSCRIPTION_TYPE } from "configs/AppConfig";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import SubscriptionService from "services/SubscriptionService";
import TemplateService from "services/TemplateService";
import { SubscriptionType } from "services/types/SubscriptionServiceType";
import { TemplateType, UserTemplateType } from "services/types/TemplateServiceType";

interface TemplateProps {
  title: string;
};
const TemplateIndex = ({ title }: TemplateProps) => {
  const [userSubscription, setUserSubscription] = useState<SubscriptionType>();
  const [allSubscription, setAllSubscription] = useState<SubscriptionType[]>([]);
  const [allTemplateLoading, withAllTemplateLoading] = useLoading();
  const [allUserTemplateLoading, withUserAllTemplateLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const getSubscription = async () => {
    try {
			const subscription = await withUserAllTemplateLoading(SubscriptionService.getAllSubscription());
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
			const subscription = await withAllTemplateLoading(SubscriptionService.getUserSubscription());
			setUserSubscription(subscription);
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
      <h4>Subscription</h4>
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
                      <h6 className="card-subtitle mb-2 text-muted">{ subscription?.description }</h6>
                      <p className="card-text">Some description of the premium plan goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <h2>${subscription?.price}/month</h2>
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
    </div>
  );
}

export default TemplateIndex;