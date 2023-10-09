import { connect } from "react-redux";
import { Dropdown, MenuProps } from "antd";
import UserAvatar from 'components/AvatarStatus';
import { User } from 'redux/types/Auth';
import { signOut } from "redux/actions";
import { RootState } from "redux/types/Root";

interface HeaderProps {
  authUser: User | null;
  signOut: () => void;
}

const HeaderNav = ({ authUser, signOut }: HeaderProps) => {
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
      label: <span className="ms-2">My Profile</span>,
      key: '1'
    },
    {
      label: <span className="ms-2">Sign Out</span>,
      key: '3',
      onClick: signOut
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