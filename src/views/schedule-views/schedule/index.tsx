import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { useLoading } from 'hooks/useLoading';
import { useEffect, useState } from 'react';
import UserService from 'services/UserService';
import { Button, Dropdown, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ScheduledType } from 'redux/types';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DAY_MONTH_YEAR } from 'configs/dateFormat';
import ScheduleService from 'services/ScheduleService';
import { ERROR_MESSAGES, TEMPLATE_PREFIX_PATH, VIEW_TEMPLATE_TYPE } from 'configs/AppConfig';
import { HandleErrors } from "services/error/handleErrors";
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
  const [errorMessage, setErrorMessage] = useState(null);
	const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

	const deleteSchedule = async (id: number) => {
		try {
			setDeleteLoading(id);
			await withDeleteLoading(ScheduleService.deleteSchedule(id));
			const newData = schedules.filter((schedule: ScheduledType) => schedule.id !== id);
			setSchedules(newData);
			messageApi.info('Schedule has been deleted successfully');
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
			render: (schedule: ScheduledType) => moment(schedule?.sendDate).format('Do MMMM, YYYY') 
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
			render: (schedule: ScheduledType) => moment(schedule?.created_at).format(DAY_MONTH_YEAR) 
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
		<div className='p-5 schedule-body-container'>
			{contextHolder}
			<Button onClick={() => navigate('create')} type="primary" style={{ marginBottom: 16 }}>Add Schedule</Button>
			{errorMessage &&
				<HandleErrors errors={errorMessage} />
			}
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
