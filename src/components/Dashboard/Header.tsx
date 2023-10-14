import { connect } from "react-redux";
import { Dropdown, MenuProps } from "antd";
import UserAvatar from 'components/AvatarStatus';
import { User } from 'redux/types/Auth';
import { signOut } from "redux/actions";
import { RootState } from "redux/types/Root";
import { SUBSCRIPTION_PREFIX_PATH } from "configs/AppConfig";
import { useNavigate } from "react-router-dom";
import { TRANSACTIONS_PREFIX_PATH } from "configs/AppConfig";
import { useState } from "react";
import ConfirmModal from "components/Modal/ConfirmModal";
import { 
	UserOutlined, 
	CreditCardOutlined, 
	DollarCircleOutlined, 
	LogoutOutlined, 
} from '@ant-design/icons';
interface HeaderProps {
  authUser: User | null;
  signOut: () => void;
}

const HeaderNav = ({ authUser, signOut }: HeaderProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubscriptionClick = () => {
    navigate(SUBSCRIPTION_PREFIX_PATH);
  }

  const handleTransactionsClick = () => {
    navigate(TRANSACTIONS_PREFIX_PATH);
  }

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  
  const items: MenuProps['items'] = [
    {
      label: (
        <div className="d-flex">
          <div className="flex-shrink-0">
            <UserAvatar size={40} authUser={authUser} />
          </div>
          <div className="flex-grow-1 ms-2 user-info mt-1">
            <div className="mt-0 user-dropdown-name mb-0">
              {authUser?.username ?? "Your Name"}
            </div>
            <p className="mt-0 user-dropdown-address mb-0">
              {authUser?.email ?? "email address"}
            </p>
          </div>
        </div>
      ),
      key: '0'
    },
    {
      label: 
        <div className="d-flex justify-content-start align-items-center">
          <UserOutlined /> 
          <span className="ms-2">My Profile</span>
        </div>,
      key: '1'
    },
    {
      label: 
        <div className="d-flex justify-content-start align-items-center">
          <CreditCardOutlined /> 
          <span className="ms-2">Subscription</span>
        </div>,
      key: '2',
      onClick: handleSubscriptionClick
    },
    {
      label: 
        <div className="d-flex justify-content-start align-items-center">
          <DollarCircleOutlined /> 
          <span className="ms-2">Transactions</span>
        </div>,
      key: '3',
      onClick: handleTransactionsClick
    },
    {
      label: 
        <div className="d-flex justify-content-start align-items-center">
          <LogoutOutlined /> 
          <span className="ms-2">Sign Out</span>
        </div>,
      key: '4',
      onClick: toggleShowModal
    }
  ];
      

  return (
    <>
      <div className="horizontal-header-wrapper">
        <div className='d-flex justify-content-end align-items-center'>
          <div className='header-left'>
            <div className="nav-right px-0">
              <ul className="ant-menu ant-menu-root ant-menu-horizontal header-menu">
                <li className="ant-menu-item ant-menu-item-only-child p-0 pl-3 pl-lg-3">
                  <Dropdown
                    className="profile-dropdown"
                    menu = {{ items }}
                    trigger={["click"]}
                  >
                    <span onClick={(e) => e.preventDefault()}>
                      <UserAvatar size={40} authUser={authUser} />
                    </span>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {
        showModal &&
        <ConfirmModal 
          title="You will be logged out of the system, and will have to login next time"
          handleConfirm={signOut}
          isOpen={showModal}
          onClose={toggleShowModal}
          errorMessage={null}
          continueText="Logout"
        />
      }
    </>
  );
};

const mapStateToProps = ({auth}: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);