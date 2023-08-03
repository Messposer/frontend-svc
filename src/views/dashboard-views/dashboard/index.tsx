import { useDocumentTitle } from 'hooks/useDocumentTitle';
import ChatSummaryChart from './chart';

interface DashboardProps {
	title: string,
}
const Dashboard = ({title}: DashboardProps) => {
	useDocumentTitle(title);
	return (
		<div className='dashboard-body-container'>
			<ChatSummaryChart />
		</div>
	)
}

export default Dashboard;
