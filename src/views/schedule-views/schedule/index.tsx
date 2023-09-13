import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Dropdown, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ScheduledType } from 'redux/types';
import { useNavigate, Link } from 'react-router-dom';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

interface ScheduleProps {
	title: string,
	onOpenModal: (id: string, type: string) => void,
}

const Schedules = ({title, onOpenModal}: ScheduleProps) => {
	const [loading, withLoading] = useLoading();
	const [loadingDelete, withDeleteLoading] = useLoading();
	const [schedules, setSchedules] = useState<ScheduledType[]>([]);
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const deleteSchedule = async (id: number) => {
		// try {
		// 	await withDeleteLoading(UserService.deleteUserContact({id}));
		// 	const newData = broadCast.filter((broadcast: any) => broadcast.id !== id);
		// 	setBroadCast(newData);
		// 	messageApi.info('Broadcast group deleted successfully');
		// } catch (error) {
		// 	console.log(error);
		// }
	};
	const columns: ColumnsType<ScheduledType> = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{ 
			title: 'Scheduled Date', 
			key: 'sendDate',
			render: (schedule: ScheduledType) => moment(schedule?.sendDate).format('Do MMMM, YYYY') 
		},
		{ 
			title: 'Contact Group', 
			key: 'contactGroup',
			render: (schedule: ScheduledType) => schedule?.contactGroup?.name
		},
		{ 
			title: 'Scheduled Message', 
			key: 'scheduledMessage',
			render: (schedule: ScheduledType) => {
				return !schedule?.messageScheduler ? 
				<Button onClick={() => onOpenModal(String(schedule?.id), "add")}>Add Message</Button> 
					: <Button onClick={() => onOpenModal(String(schedule?.id), "show")}>View Message</Button> 
			}
		},
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (schedule: ScheduledType) => moment(schedule?.created_at).format('Do MMMM, YYYY') 
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (schedule: ScheduledType) => 
				<Dropdown 
					menu={{
						items,
						onClick: (event) => handleMenuClick(event, schedule),
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

	const handleMenuClick = (e: any, schedule: any) => {
    if (e.key === 'edit') {
			navigate(`${schedule?.id}`);
    } else if (e.key === 'view') {
      onOpenModal(String(schedule?.id), "show");
    } else if (e.key === 'delete') {
      deleteSchedule(schedule?.id);
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
	
	const getSchedules = async () => {
		try {
			const schedules = await withLoading(UserService.getUserSchedules());
			setSchedules(schedules);
		} catch (error) {
			console.log(error);
		}
	}
	
	useEffect(() => {
		getSchedules();
  }, []);

	useDocumentTitle(title);

	return (
		<div className='p-5 schedule-body-container'>
			{contextHolder}
			<Button onClick={() => navigate('create')} type="primary" style={{ marginBottom: 16 }}>Add Schedule</Button>
			<Table
				columns={columns}
				loading={loading}
				rowKey={(schedule) => schedule.id}
				dataSource={schedules}
			/>
		</div>

	)
}

export default Schedules;
