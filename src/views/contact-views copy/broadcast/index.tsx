import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Dropdown, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BroadCastType } from 'redux/types';
import { useNavigate } from 'react-router-dom';
import { 
	EditOutlined, 
	DeleteOutlined, 
	ClusterOutlined, 
	TeamOutlined, 
	SettingOutlined 
} from '@ant-design/icons';
import FilterInput from 'components/Input/filterInput';

interface BroadProps {
	title: string,
	onOpenModal: (id: string) => void;
}

const BroadCast = ({title, onOpenModal}: BroadProps) => {
	const [loading, withLoading] = useLoading();
	const [loadingDelete, withDeleteLoading] = useLoading();
	const [broadCast, setBroadCast] = useState<BroadCastType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const [filterValue, setFilterValue] = useState<string>('');

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

	const filteredBroadCasts = broadCast.filter((broadCast: BroadCastType) =>
    `${broadCast.name} ${broadCast.note}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

	const columns: ColumnsType<BroadCastType> = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Note', dataIndex: 'note', key: 'note' },
		{
			title: 'Contacts',
			key: 'contacts',
			fixed: 'right',
			width: 100,
			render: (broadCast: BroadCastType) => 
				<Button 
					type="primary" 
					onClick={() => onOpenModal(String(broadCast?.id))}
					icon={<TeamOutlined />}
				>
					Manage Contacts
				</Button>,
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
						icon={<SettingOutlined />}
					> 
						Options
					</Button>
				</Dropdown>
		},
	];

	const handleMenuClick = (e: any, broadCast: BroadCastType) => {
    if (e.key === 'edit') {
			navigate(`${broadCast?.id}`);
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

	return (
		<div className='p-5 chat-body-container'>
			{contextHolder}
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button 
					onClick={() => navigate('create')} 
					type="primary"
					size="large"
					icon={<ClusterOutlined />}
				>
					Add Broadcast list
				</Button>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter broadcast list'
				/>
			</div>
			<Table
				columns={columns}
				rowSelection={{}}
				loading={loading}
				rowKey={(broadcast) => broadcast.id}
				dataSource={filteredBroadCasts}
			/>
		</div>

	)
}

export default BroadCast;
