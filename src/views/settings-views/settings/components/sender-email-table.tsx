import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import { Button, Table, Dropdown, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
	DeleteOutlined,
	TeamOutlined,
	SettingOutlined,
	MailOutlined,
} from '@ant-design/icons';
import FilterInput from 'components/Input/filterInput';
import { ERROR_MESSAGES, SENDER_EMAIL_STATUS_TYPE } from 'configs/AppConfig';
import ConfirmModal from 'components/Modal/ConfirmModal';
import MomentTime from 'components/Moment';
import SettingsService from 'services/SettingsService';
import { SenderEmailDataType } from 'services/types/SettingsSerivceType';
import { toast } from 'sonner';

interface SenderEmailTableProps {
	title: string,
	onOpenModal: (id: string, type: string) => void;
	senderEmailId: string | null;
}

const SenderEmailTable = ({title, onOpenModal, senderEmailId}: SenderEmailTableProps) => {
	const [loading, withLoading] = useLoading();
	const [senderEmails, setSenderEmails] = useState<SenderEmailDataType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [filterValue, setFilterValue] = useState<string>('');
	const [deleteId, setDeleteId] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState<boolean>(false);
	const [deleteLoading, setDeleteLoading] = useState<number | null | undefined>(null);
	const [loadingDelete, withDeleteLoading] = useLoading();
	const [resendLoading, withResendLoading] = useLoading();

	const deleteEmail = async () => {
		try {
			setDeleteLoading(deleteId);
			await withDeleteLoading(SettingsService.deleteUserSenderEmail(deleteId));
			const newData = senderEmails.filter((senderEmail: SenderEmailDataType) => senderEmail.id !== deleteId);
			setSenderEmails(newData);
			toast.success("Email has been removed from your sending email list");
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}	finally {
			setDeleteLoading(null);
			toggleShowModal();
		}
	};

	const filteredSenderEmails = senderEmails.filter((senderEmail: SenderEmailDataType) =>
    `${senderEmail.email} ${senderEmail.email} ${senderEmail.dns} ${senderEmail.senderName}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

	const toggleShowModal = () => {
    setShowModal(!showModal);
    setErrorMessage(null);
  };

	const columns: ColumnsType<SenderEmailDataType> = [
		{ title: 'Email', dataIndex: 'email', key: 'email' },
		{ title: 'Sender Name', dataIndex: 'senderName', key: 'senderName' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{ title: 'DNS', dataIndex: 'dns', key: 'dns' },
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (senderEmail: SenderEmailDataType) => <MomentTime date={senderEmail.created_at ?? ""} />
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (senderEmail: SenderEmailDataType) => 
				<Dropdown 
					menu={{
						items: getDropdownItems(senderEmail),
						onClick: (event) => handleMenuClick(event, senderEmail),
					}}
					placement="bottomLeft" trigger={['click']}>
					<Button 
						type="primary" 
						danger={true}
						className="custom-button custom-button-sm custom-secondary-button"
						icon={<SettingOutlined />}
						loading={deleteLoading === senderEmail?.id }
					> 
						Options
					</Button>
				</Dropdown>
		},
	];

	const handleMenuClick = (e: any, senderEmail: SenderEmailDataType) => {
    if (e.key === 'resendCode') {
			resendConfirmationCode(senderEmail?.id);
    } else if (e.key === 'view') {
      onOpenModal(String(senderEmail?.id), "show");
    } else if (e.key === 'delete') {
      toggleShowModal();
			setDeleteId(senderEmail.id)
    }
  };

	const getDropdownItems = (senderEmail: SenderEmailDataType) => {
		const isViewDisabled = senderEmail.status === SENDER_EMAIL_STATUS_TYPE.ACTIVE;
		return items.map(item => {
			if (item.key === 'resendCode') {
				return {
					...item,
					disabled: isViewDisabled,
				};
			}
			return item;
		});
	};

	const items = [
		{
			label: 'Confirm email',
			key: 'resendCode',
			icon: <MailOutlined />,
		},
		// {
		// 	label: 'Delete',
		// 	key: 'delete',
		// 	icon: <DeleteOutlined />,
		// 	danger: true,
		// },
	];
	
	const getSenderEmails = async () => {
		try {
			const emailList = await withLoading(SettingsService.getUserSenderEmails());
			setSenderEmails(emailList);
		} catch (error) {
			toast.error('Error fetching emails list, reload this page to try again');
		}
	}

	const resendConfirmationCode = async (id: number) => {
		try {
			setDeleteLoading(id);
			await withResendLoading(SettingsService.resendConfirmationCode(id));
			toast.success('Confirmation link has been resent to your email');
		} catch (error) {
			toast.error('Error fetching emails list, reload this page to try again');
		}finally {
			setDeleteLoading(null);
		}
	}
	
	useEffect(() => {
		getSenderEmails();
  }, [senderEmailId]);

	useDocumentTitle(title);

	const handleAddFromEmailClick = () => {
		onOpenModal("new","add");
	}

	return (
		<div className='sender-email-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
        <Button 
          type="primary"
          icon={<TeamOutlined />}
          size="large"
          className="custom-button custom-primary-button"
					onClick={handleAddFromEmailClick}
        >
          Add From Email
        </Button>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter Email list'
				/>
			</div>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(senderEmail) => senderEmail.id}
				dataSource={filteredSenderEmails}
			/>
			{
        showModal &&
        <ConfirmModal 
          title="The selected email will be deleted, which might after your existing templates"
          loading={loading} 
          handleConfirm={deleteEmail}
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

export default SenderEmailTable;
