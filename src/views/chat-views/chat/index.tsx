import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { RootState } from 'redux/types/Root';
import UserService from 'services/UserService';
import { saveUserChats } from 'redux/actions';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ChatType, MessageType } from 'redux/types';
import { Link, useNavigate } from 'react-router-dom';

interface ChatProps {
	title: string,
	userChats: any,
	saveUserChats: any
}

const columns: ColumnsType<ChatType> = [
  Table.EXPAND_COLUMN,
  { 
		title: 'Chat', 
		dataIndex: 'chat_gpt_message', 
		key: 'chat',
		render: (text: string) => `${text.slice(0, 200)}...`, 
	},
  {
    title: 'Contact',
    dataIndex: 'message',
    key: 'contact',
		width: 300,
    render: (message: MessageType) => `${message?.contact?.first_name} ${message?.contact?.last_name}`, // Return the first name of the contact
  },
];

const Chat = ({title, userChats, saveUserChats}: ChatProps) => {
	const [loading, withLoading] = useLoading();

	const navigate = useNavigate();
	
	const getChats = async () => {
		try {
			const chats = await withLoading(UserService.getUserChats());
			saveUserChats(chats);
		} catch (error) {
			console.log(error);
		}
	}

	const handleAdd = () => {
		navigate('compose');
	}
	
	useEffect(() => {
		getChats();
  }, []);

	useDocumentTitle(title);
	return (
		<div className='chat-body-container p-5'>
			<Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Compose
      </Button>
			<Table
				columns={columns}
				loading={loading}
				rowKey={(chat) => chat.id}
				expandable={{
					expandedRowRender: (chat: ChatType) => <p style={{ margin: 0 }}>
						<div className="row">
							<div className="col">
								<div className="row">
									<div className="col">
										<p>{`${chat.message.text}`}</p>
									</div>
								</div>

								<div className="row">
									<div className="col">
										<Link to={`/chats/${chat.id}`}>Go to details</Link>
									</div>
								</div>

							</div>
						</div>
					</p>,
				}}
				dataSource={userChats}
			/>
		</div>

	)
}

const mapStateToProps = ({chat}: RootState) => {
	const { userChats } = chat;
	return {chat, userChats}
}

const mapDispatchToProps = {
	saveUserChats,
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat)
