import { connect } from "react-redux";
import { ChatType } from 'redux/types';
import { RootState } from "redux/types/Root";
import { User } from 'redux/types/Auth';
import MomentTime from 'components/Moment';
import {
	WhatsAppOutlined,
	InstagramOutlined,
} from '@ant-design/icons';

interface MessageTextProps {
  authUser: User | null;
  message: ChatType;
}

const MessageText = ({ authUser, message }: MessageTextProps) => {
  return (
    <div className="message-text-wrapper">
      <span className={`message-text-container ${authUser?.id === message?.sender?.id ? 'sender' : ''}`}>
        <span>{ message?.text }</span>
        <div 
          className="message-timestamp d-flex justify-content-end gap-2"
        >
          <div className="message-channels d-flex justify-content-end align-items-center gap-1">
            <div>Sent: </div>
            <WhatsAppOutlined />
            <InstagramOutlined />
          </div>
          <MomentTime 
            date={message.created_at ?? ""} 
            type ="relative" 
          />
        </div>
      </span>
    </div>
  )
}

const mapStateToProps = ({auth}: RootState) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(MessageText);