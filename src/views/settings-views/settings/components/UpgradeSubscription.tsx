import { Button } from "antd";
import { ERROR_MESSAGES, SUBSCRIPTION_PREFIX_PATH, SUBSCRIPTION_TYPE } from "configs/AppConfig";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { RootState } from "redux/types/Root";
import SubscriptionService from "services/SubscriptionService";
import { SubscriptionType } from "services/types/SubscriptionServiceType";
import { connect } from "react-redux";
import { User } from "redux/types";
import { useNavigate } from "react-router-dom";

interface UserSubscriptionType {
  authUser: User | null;
}
const UpgradeSubscription = ({ authUser }: UserSubscriptionType) => {
  const [userSubscription, setUserSubscription] = useState<SubscriptionType>();
	const [subscriptionLoading, withSubscriptionLoading] = useLoading();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const getUserSubscription = async () => {
		try {
			const userSubscription = await withSubscriptionLoading(SubscriptionService.getUserSubscription());
			setUserSubscription(userSubscription);
		} catch (error: any) {
			setMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  useEffect(() => {
    getUserSubscription();
  }, []);

  return (
    <>
    {
      userSubscription?.name === SUBSCRIPTION_TYPE.FREE &&
      <div className="alert alert-info" role="alert">
        <div className="d-flex justify-content-between align-items-center">
          <span>You are not a free plan, upgrade to a paid plan to add more than 3 emails</span>
          <Button 
            type='primary' 
            size="small"
            onClick={() => navigate(SUBSCRIPTION_PREFIX_PATH)}
          >
            Upgrade
          </Button>
        </div>
      </div>
    }
    </>
  )

};

const mapStateToProps = ({auth}: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(UpgradeSubscription);