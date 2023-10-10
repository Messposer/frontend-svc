import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table, message, Menu, Dropdown, MenuProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ContactType } from 'redux/types';
import { Link, useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
} from '@ant-design/icons';
import UploadCSVModal from './csvModal';
import FilterInput from 'components/Input/filterInput';

interface ContactProps {
	title: string,
}

const Contact = ({title}: ContactProps) => {
	const [loading, withLoading] = useLoading();
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [showCsvModal, setShowCsvModal] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>('');

	const filteredContacts = contacts.filter((contact: ContactType) =>
    `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.number}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

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

	const items: MenuProps['items'] = [
		{
			label: 'Create a new contact',
			key: '1',
			onClick: handleAdd
		},
		{
			label: 'Upload CSV file',
			key: '2',
			onClick: toggleUploadCsvModal
		}
	];

	return (
		<div className='p-5 chat-body-container'>
			{contextHolder}
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft" arrow>
					<Button type="primary">Add Contact</Button>
				</Dropdown>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter contacts'
				/>
			</div>
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
				dataSource={filteredContacts}
			/>
			<UploadCSVModal showCsvModal={showCsvModal} getContacts={getContacts} toggleUploadCsvModal={toggleUploadCsvModal} />
		</div>

	)
}

export default Contact;
