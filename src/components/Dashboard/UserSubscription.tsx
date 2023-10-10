import { Button } from "antd";
import { ERROR_MESSAGES, SUBSCRIPTION_PREFIX_PATH } from "configs/AppConfig";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { RootState } from "redux/types/Root";
import SubscriptionService from "services/SubscriptionService";
import { SubscriptionType } from "services/types/SubscriptionServiceType";
import { connect } from "react-redux";
import { User } from "redux/types";
import { useNavigate } from "react-router-dom";

interface UserSubscriptionType {
  alt: boolean;
  authUser: User | null;
}
const UserSubscription = ({ alt = false, authUser }: UserSubscriptionType) => {
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
      alt &&
      <div className="alert alert-warning" role="alert">
        <div className="d-flex justify-content-start align-items-center m-0">
          <h6>Plan: </h6>
          <h6>{userSubscription?.name}</h6>
        </div>
        <div className="d-flex justify-content-start align-items-center m-0">
          <h6>Expire Date: </h6>
          <h6>{authUser?.subscription_expire ?? " Does not expire"}</h6>
        </div>
      </div>
    }
    {
      !alt &&
      <div className="d-flex justify-content-between align-items-center m-0 alert alert-warning" role="alert">
        <h6>You are on a free plan</h6>
        <Button 
          type='primary' 
          size="large"
          onClick={() => navigate(SUBSCRIPTION_PREFIX_PATH)}
        >
          Upgrade to paid
        </Button>
      </div>
    }
    </>
  )

};

const mapStateToProps = ({auth}: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(UserSubscription);