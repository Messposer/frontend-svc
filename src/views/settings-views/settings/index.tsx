import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { User } from 'redux/types';
import { RootState } from 'redux/types/Root';
import { connect } from 'react-redux';
import UserAvatar from 'components/AvatarStatus';
import MomentTime from 'components/Moment';
import { Tabs } from 'antd';
import SenderEmailTable from './components/sender-email-table';
import UpgradeSubscription from './components/UpgradeSubscription';

const { TabPane } = Tabs;

interface SettingsProps {
	title: string,
  authUser: User | null;
	onOpenModal: (id: string, type: string) => void;
  senderEmailId: string | null;
}

const Settings = ({title, authUser, onOpenModal, senderEmailId}: SettingsProps) => {
	useDocumentTitle(title);
	return (
		<div className='p-3 profile-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5>Sending Settings</h5>
			</div>
      <UpgradeSubscription />
      <div className="bg-white mt-4 py-2 px-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Email Settings" key="1">
            <h4 className="text-sub-title">This let you change your <b><i>from_email</i></b> address</h4>
            <div className='mt-4'>
              <SenderEmailTable title='from email settings' onOpenModal={onOpenModal} senderEmailId={senderEmailId}/>
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

export default connect(mapStateToProps)(Settings);
