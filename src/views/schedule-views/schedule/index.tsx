import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ScheduledType } from 'redux/types';
import { useNavigate } from 'react-router-dom';
import {
	EditOutlined,
	EyeOutlined,
	DeleteOutlined,
	ScheduleOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import ScheduleService from 'services/ScheduleService';
import { ERROR_MESSAGES, TEMPLATE_PREFIX_PATH, VIEW_TEMPLATE_TYPE } from 'configs/AppConfig';
import { HandleErrors } from "services/error/handleErrors";
import FilterInput from 'components/Input/filterInput';
import MomentTime from 'components/Moment';
import { toast } from 'sonner';

interface ScheduleProps {
	title: string,
	onOpenModal: (id: string, type: string) => void,
}

const Schedules = ({title, onOpenModal}: ScheduleProps) => {
	const [loading, withLoading] = useLoading();
	const [loadingDelete, withDeleteLoading] = useLoading();
	const [schedules, setSchedules] = useState<ScheduledType[]>([]);
	const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
	const [filterValue, setFilterValue] = useState<string>('');

	const filteredSchedules = schedules.filter((schedule: ScheduledType) =>
    `${schedule.name} ${schedule.status}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

	const deleteSchedule = async (id: number) => {
		try {
			setDeleteLoading(id);
			await withDeleteLoading(ScheduleService.deleteSchedule(id));
			const newData = schedules.filter((schedule: ScheduledType) => schedule.id !== id);
			setSchedules(newData);
			toast.success('Schedule has been deleted successfully');
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}	finally {
			setDeleteLoading(null); 
		}
	};
	const columns: ColumnsType<ScheduledType> = [
		{ title: 'Name', dataIndex: 'name', key: 'name' },
		{ title: 'Status', dataIndex: 'status', key: 'status' },
		{ 
			title: 'Scheduled Date', 
			key: 'sendDate',
			render: (schedule: ScheduledType) => <MomentTime date={schedule.sendDate} />
		},
		{ 
			title: 'Contact Group', 
			key: 'contactGroup',
			render: (schedule: ScheduledType) => schedule?.contactGroup?.name
		},
		{ 
			title: 'Message', 
			key: 'scheduledMessage',
			render: (schedule: ScheduledType) => {
				return schedule?.userTemplate
					? <Button 
							onClick={() => navigate(`${TEMPLATE_PREFIX_PATH}?templateId=${schedule?.userTemplate?.template?.id}&modal_mode=show_template&viewType=${VIEW_TEMPLATE_TYPE?.USER}`)}
						>
							View Template
						</Button>
					: !schedule?.messageScheduler
						? <Button onClick={() => onOpenModal(String(schedule?.id), "add")}>Add Message</Button>
						: <Button onClick={() => onOpenModal(String(schedule?.id), "show")}>View Message</Button>;
			}
		},
		{ 
			title: 'Dated Created', 
			key: 'createdAt',
			render: (schedule: ScheduledType) => <MomentTime date={schedule.created_at} />
		},
		{
			title: 'Action',
			key: 'operation',
			fixed: 'right',
			width: 100,
			render: (schedule: ScheduledType) => 
				<Dropdown 
					menu={{
						items: getDropdownItems(schedule),
						onClick: (event) => handleMenuClick(event, schedule),
					}}
					placement="bottomLeft" trigger={['click']}>
					<Button 
						type="primary" 
						danger={true}
						className="custom-button custom-button-sm custom-secondary-button"
						icon={<SettingOutlined />}
						loading={deleteLoading === schedule?.id}
					> 
						Options
					</Button>
				</Dropdown>
		},
	];

	const getDropdownItems = (schedule: ScheduledType) => {
		const isViewDisabled = moment(schedule?.sendDate).isSameOrBefore(moment().startOf('day')) || schedule?.isSent;// Add your condition here;
		
		return items.map(item => {
			if (item.key === 'edit') {
				return {
					...item,
					disabled: isViewDisabled,
				};
			}
			if (item.key === 'delete') {
				return {
					...item,
					disabled: isViewDisabled,
					danger: isViewDisabled ? false : true,
				};
			}
			return item;
		});
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

	
	const getSchedules = async () => {
		try {
			const schedules = await withLoading(UserService.getUserSchedules());
			setSchedules(schedules);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}
	
	useEffect(() => {
		getSchedules();
  }, []);

	useDocumentTitle(title);

	return (
		<div className='p-3 schedule-body-container'>
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<Button 
					onClick={() => navigate('create')} 
					type="primary" 
					size="large"
					className="custom-button custom-button-md custom-primary-button"
					icon={<ScheduleOutlined />}
				>
					Add Schedule
				</Button>
				<FilterInput 
					filterValue={filterValue} 
					setFilterValue={setFilterValue} 
					placeholder='Filter schedule list'
				/>
			</div>
			{errorMessage &&
				<HandleErrors errors={errorMessage} />
			}
			<Table
				columns={columns}
				loading={loading}
				rowKey={(schedule) => schedule.id}
				dataSource={filteredSchedules}
			/>
		</div>

	)
}

export default Schedules;
