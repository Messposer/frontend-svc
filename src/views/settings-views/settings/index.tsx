import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { User } from 'redux/types';
import { RootState } from 'redux/types/Root';
import { connect } from 'react-redux';
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
      <UpgradeSubscription />
      <div className="bg-white py-2 px-4">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Email Settings" key="1">
            <h4 className="text-sub-title">This let you change your <b><i>from_email</i></b> address</h4>
            <div className='mt-4'>
              <SenderEmailTable title='from email settings' onOpenModal={onOpenModal} senderEmailId={senderEmailId}/>
            </div>
          </TabPane>
          <TabPane tab="Integrations" key="2">
            <h4 className="text-sub-title">This let you add your business account to messponser</h4>
            <div className='mt-4'>
              
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
