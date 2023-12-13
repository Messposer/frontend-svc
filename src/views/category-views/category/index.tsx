import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import {
	DeleteOutlined,
	TeamOutlined
} from '@ant-design/icons';
import FilterInput from 'components/Input/filterInput';
import { ERROR_MESSAGES } from 'configs/AppConfig';
import ConfirmModal from 'components/Modal/ConfirmModal';
import MomentTime from 'components/Moment';
import { toast } from 'sonner';
import { CategoryType } from 'redux/types';
interface ContactProps {
	title: string,
}

const Contact = ({title}: ContactProps) => {
	const [loading, withLoading] = useLoading();
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const [filterValue, setFilterValue] = useState<string>('');
	const [deleteId, setDeleteId] = useState<string>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);

	const filteredContacts = categories.filter((category: CategoryType) =>
    `${category.title} ${category.description}`
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
				await withLoading(UserService.DeleteACategory(deleteId));
				const newData = categories.filter((category: CategoryType) => category.id !== deleteId);
				setCategories(newData);
				toggleShowModal();
				toast.success('Category deleted successfully');
			} catch (error: any) {
				setErrorMessage(
					error?.response?.data?.message
						? error?.response?.data?.message
						: ERROR_MESSAGES.NETWORK_CONNECTIVITY
				);
			}
		}
	};

	const columns: ColumnsType<CategoryType> = [
		{ title: 'Title', dataIndex: 'title', key: 'title' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (contact: CategoryType) => <MomentTime date={contact.created_at} showTime={false}/>
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (contact: CategoryType) => (
				<div className="d-flex justify-content-between align-items-center">
					<Button 
						danger 
						icon={<DeleteOutlined />} 
						onClick={() => [setDeleteId(contact.id), toggleShowModal()]}
						className="custom-button custom-button-sm"
					>
						Delete
					</Button>
				</div>
			),
		},
	];

	const navigate = useNavigate();
	
	const getCategories = async () => {
		try {
			const categories = await withLoading(UserService.getAllCategories());
			setCategories(categories?.data?.categories);
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(() => {
		getCategories();
  }, []);

	useDocumentTitle(title);

	return (
		<div className='p-3 chat-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button 
					type="primary"
					icon={<TeamOutlined />}
					size="large"
					className="custom-button custom-primary-button"
                    onClick={() => navigate('create')}
				>
					Add Contact
				</Button>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter category'
				/>
			</div>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(contact) => contact.id}
				dataSource={filteredContacts}
			/>
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
