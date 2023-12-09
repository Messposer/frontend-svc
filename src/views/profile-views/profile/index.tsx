import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { User } from 'redux/types';
import { RootState } from 'redux/types/Root';
import { connect } from 'react-redux';
import { UserAvatar } from 'components/AvatarStatus';
import MomentTime from 'components/Moment';
import { Tabs } from 'antd';
import ChangePassword from './changePassword';

const { TabPane } = Tabs;

interface ProfileProps {
	title: string,
  authUser: User | null;
}

const Profile = ({title, authUser}: ProfileProps) => {
	useDocumentTitle(title);
	return (
		<div className='p-3 profile-body-container'>
      <div className="bg-white py-2 px-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile Info" key="1">
            <div className='profile-wrapper py-3'>
              <div className="d-flex justify-content-start align-items-center">
                <div className="">
                  <UserAvatar size={80} authUser={authUser} />
                </div>
                <div className="ms-4 mt-1 user-info">
                  <div className="text-title">
                    {authUser?.username ?? "Your Name"}
                  </div>
                  <p className="text-sub-title">
                    {authUser?.email ?? "email address"} - Joined <MomentTime date={authUser?.created_at ?? ""} />
                  </p>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Change Password" key="2">
            <div className="col-md-7">
              <ChangePassword />
            </div>
          </TabPane>
        </Tabs>
      </div>
		</div>
	)
}

const mapStateToProps = ({auth}: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(Profile);
