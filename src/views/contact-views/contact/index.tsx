import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table, message, Menu, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ContactType } from 'redux/types';
import { Link, useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import UploadCSVModal from './csvModal';

interface ContactProps {
	title: string,
}

const Contact = ({title}: ContactProps) => {
	const [loading, withLoading] = useLoading();
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [showCsvModal, setShowCsvModal] = useState<boolean>(false);

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

	const toggleUploadCsvModal = () => {
		setShowCsvModal(!showCsvModal);
	}

	const contactMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleAdd}>Create a new contact</Menu.Item>
      <Menu.Item key="2" onClick={toggleUploadCsvModal}>Upload CSV file</Menu.Item>
    </Menu>
  );

	return (
		<div className='p-5 chat-body-container'>
			{contextHolder}
			<Dropdown overlay={contactMenu} trigger={['click']} placement="bottomLeft" arrow>
				<Button type="primary" style={{ marginBottom: 16 }}>Add Contact</Button>
			</Dropdown>
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
			<UploadCSVModal showCsvModal={showCsvModal} getContacts={getContacts} toggleUploadCsvModal={toggleUploadCsvModal} />
		</div>

	)
}

export default Contact;
