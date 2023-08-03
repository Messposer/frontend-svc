import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ContactType } from 'redux/types';
import { Link, useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
} from '@ant-design/icons';

interface ContactProps {
	title: string,
}

const Contact = ({title}: ContactProps) => {
	const [loading, withLoading] = useLoading();
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();

	const deleteContact = async (id: number) => {
		try {
			await withLoading(UserService.deleteUserContact({id}));
			const newData = contacts.filter((contact: ContactType) => contact.id !== id);
			setContacts(newData);
			messageApi.info('Contact deleted successfully');
		} catch (error) {
			console.log(error);
		}
	};

	const columns: ColumnsType<ContactType> = [
		Table.EXPAND_COLUMN,
		{ title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
		{ title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Phone', dataIndex: 'number', key: 'number' },
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (contact: ContactType) => <DeleteOutlined onClick={() => deleteContact(contact.id)}/>,
		},
	];

	const navigate = useNavigate();
	
	const getContacts = async () => {
		try {
			const contacts = await withLoading(UserService.getUserContacts());
			setContacts(contacts);
		} catch (error) {
			console.log(error);
		}
	}

	const handleAdd = () => {
		navigate('new');
	}
	
	useEffect(() => {
		getContacts();
  }, []);

	useDocumentTitle(title);
	return (
		<div className='chat-body-container p-5'>
			{contextHolder}
			<Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add Contact
      </Button>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(contact) => contact.id}
				expandable={{
					expandedRowRender: (contact: ContactType) => <p style={{ margin: 0 }}>
						<div className="row">
							<div className="col">
								<div className="row">
									<div className="col">
										<span className="text-capitalize"><strong>Address:</strong> {contact.address ?? 'Not Set'}</span><br />
										<span><strong>Note:</strong> {contact.note ?? 'Not Set'}</span><br />
										<span><strong>Created at:</strong> {contact.created_at ?? 'Not Set'}</span><br />
										<Link to={`${contact.id}`}>Edit contact</Link>
									</div>
								</div>
							</div>
						</div>
					</p>,
				}}
				dataSource={contacts}
			/>
		</div>

	)
}

export default Contact;
