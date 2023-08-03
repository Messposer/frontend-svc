import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { RootState } from 'redux/types/Root';
import UserService from 'services/UserService';
import { saveUserSingleChat } from 'redux/actions';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { messageStatus } from 'utils/messageStatus';
import { ChatType } from 'redux/types';

interface ChatProps {
	title: string,
	saveUserSingleChat: any,
  singleChat: any
}

const SingleChat = ({title, singleChat, saveUserSingleChat}: ChatProps) => {
	const [loading, withLoading] = useLoading();

	const navigate = useNavigate();

	const { id } = useParams(); 
	
	const getChats = async () => {
		try {
			const chat = await withLoading(UserService.getUserSingleChat({id}));
			saveUserSingleChat(chat);
		} catch (error) {
			console.log(error);
		}
	}

	const handleAdd = () => {
		navigate('/chats/compose');
	}
	
	useEffect(() => {
		getChats();
  }, []);

	useDocumentTitle(title);
	return (
		<div className='chat-body-container p-5'>
			<Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        New Message
      </Button>

			<div className="bg-white p-3">
				<div className="col">
					<h6>Message Info:</h6>
					<span><strong>Text:</strong> {`${singleChat?.chat_gpt_message}`}</span><br />
					<span className="text-capitalize"><strong>Status:</strong> {messageStatus(singleChat?.message?.status) }</span><br />
					<span className="text-capitalize"><strong>Transporter:</strong> {singleChat?.message?.transporter}</span><br />
					<span className="text-capitalize"><strong>Date:</strong> {singleChat?.message?.created_at}</span><br />
				</div>
				<div className="col">
					<h6>Contact Info:</h6>
					<span className="text-capitalize">Name: {`${singleChat?.message?.contact?.first_name} ${singleChat?.message?.contact?.last_name}`}</span><br />
					<span>Email: {`${singleChat?.message?.contact?.email}`}</span><br />
					<span>See contact details</span>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({chat}: RootState) => {
	const { singleChat } = chat;
	return {singleChat}
}

const mapDispatchToProps = {
	saveUserSingleChat,
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleChat)
