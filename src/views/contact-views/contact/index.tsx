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
	TeamOutlined,
} from '@ant-design/icons';
import UploadCSVModal from './csvModal';
import FilterInput from 'components/Input/filterInput';
import { ERROR_MESSAGES } from 'configs/AppConfig';
import ConfirmModal from 'components/Modal/ConfirmModal';
import MomentTime from 'components/Moment';
import { toast } from 'sonner';
interface ContactProps {
	title: string,
}

const Contact = ({title}: ContactProps) => {
	const [loading, withLoading] = useLoading();
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [showCsvModal, setShowCsvModal] = useState<boolean>(false);
	const [filterValue, setFilterValue] = useState<string>('');
	const [deleteId, setDeleteId] = useState<number>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);

	const filteredContacts = contacts.filter((contact: ContactType) =>
    `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.number}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

	const toggleShowModal = () => {
    setShowModal(!showModal);
    setErrorMessage(null);
  };

	const deleteContact = async () => {
		if(deleteId){
			try {
				await withLoading(UserService.deleteUserContact(deleteId));
				const newData = contacts.filter((contact: ContactType) => contact.id !== deleteId);
				setContacts(newData);
				toggleShowModal();
				toast.success('Contact deleted successfully');
			} catch (error: any) {
				setErrorMessage(
					error?.response?.data?.message
						? error?.response?.data?.message
						: ERROR_MESSAGES.NETWORK_CONNECTIVITY
				);
			}
		}
	};

	const columns: ColumnsType<ContactType> = [
		{ title: 'First Name', dataIndex: 'first_name', key: 'first_name' },
		{ title: 'Last Name', dataIndex: 'last_name', key: 'last_name' },
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Phone', dataIndex: 'number', key: 'number' },
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (contact: ContactType) => <MomentTime date={contact.created_at} />
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (contact: ContactType) => <DeleteOutlined onClick={() => [setDeleteId(contact.id), toggleShowModal()]}/>,
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
		<div className='p-3 chat-body-container'>
			{contextHolder}
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Dropdown menu={{ items }} trigger={['click']} placement="bottomLeft" arrow>
					<Button 
						type="primary"
						icon={<TeamOutlined />}
						size="large"
						className="custom-button custom-primary-button"
					>
						Add Contact
					</Button>
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
			{
        showModal &&
        <ConfirmModal 
          title="The selected contact will be deleted, which might after your existing templates"
          loading={loading} 
          handleConfirm={deleteContact}
          isOpen={showModal}
          onClose={toggleShowModal}
          errorMessage={errorMessage}
          continueText="Yes, delete"
					errorMessageTitle="Error Deleting"
        />
      }
		</div>

	)
}

export default Contact;
