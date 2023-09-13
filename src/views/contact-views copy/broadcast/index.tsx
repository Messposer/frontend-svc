import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Dropdown, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BroadCastType, ContactType } from 'redux/types';
import { Link, useNavigate } from 'react-router-dom';
import AddContactToBroadcastModal from './addContactToBroadcastModal';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
interface BroadProps {
	title: string,
}

const BroadCast = ({title}: BroadProps) => {
	const [loading, withLoading] = useLoading();
	const [loadingDelete, withDeleteLoading] = useLoading();
	const [broadCast, setBroadCast] = useState<BroadCastType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const [showContactToBroadcastModal, setShowContactToBroadcastModal] = useState<boolean>(false);
	const [broadCastSingle, setBroadCastSingle] = useState<any>();
	const navigate = useNavigate();

	const deleteBroadCast = async (id: number) => {
		try {
			await withDeleteLoading(UserService.deleteUserContact({id}));
			const newData = broadCast.filter((broadcast: any) => broadcast.id !== id);
			setBroadCast(newData);
			messageApi.info('Broadcast group deleted successfully');
		} catch (error) {
			console.log(error);
		}
	};

	const columns: ColumnsType<BroadCastType> = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Note', dataIndex: 'note', key: 'note' },
		{
			title: 'Contacts',
			key: 'contacts',
			fixed: 'right',
			width: 100,
			render: (broadCast: BroadCastType) => 
				<Button type="primary" onClick={() => 
					[toggleContactToBroadcastModal(), setBroadCastSingle(broadCast)]
				}>Manage Contacts</Button>,
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (broadCast: BroadCastType) => 
				<Dropdown 
					menu={{
						items,
						onClick: (event) => handleMenuClick(event, broadCast),
					}}
				placement="bottomLeft" trigger={['click']}>
					<Button 
						type="primary" 
						danger={true}
						loading={loadingDelete}
					> 
						Options
					</Button>
				</Dropdown>
		},
	];

	const handleMenuClick = (e: any, broadCast: BroadCastType) => {
    if (e.key === 'edit') {
			navigate(`${broadCast?.id}`);
    } else if (e.key === 'view') {
      alert("view");
    } else if (e.key === 'delete') {
      deleteBroadCast(broadCast?.id);
    }
  };

	const items = [
		{
			label: 'Edit',
			key: 'edit',
			icon: <EditOutlined />,
		},
		{
			label: 'View',
			key: 'view',
			icon: <EyeOutlined />,
		},
		{
			label: 'Delete',
			key: 'delete',
			icon: <DeleteOutlined />,
			danger: true,
		},
	];
	
	const getBroadCasts = async () => {
		try {
			const broadcast = await withLoading(UserService.getUserContactGroups());
			setBroadCast(broadcast);
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(() => {
		getBroadCasts();
  }, []);

	useDocumentTitle(title);

	const toggleContactToBroadcastModal = () => {
		setShowContactToBroadcastModal(prevState => !prevState);
	}

	return (
		<div className='p-5 chat-body-container'>
			{contextHolder}
			<Button onClick={() => navigate('create')} type="primary" style={{ marginBottom: 16 }}>Add Broadcast list</Button>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(broadcast) => broadcast.id}
				dataSource={broadCast}
			/>
			{
				showContactToBroadcastModal &&
				<AddContactToBroadcastModal 
					showAddContactToBroadcastModal={showContactToBroadcastModal} 
					broadCast={broadCastSingle}
					toggleAddContactToBroadcastModal={toggleContactToBroadcastModal} 
				/>
			}
		</div>

	)
}

export default BroadCast;
