import { useDocumentTitle } from 'hooks/useDocumentTitle';

interface DashboardProps {
	title: string,
}
const Dashboard = ({title}: DashboardProps) => {
	useDocumentTitle(title);
	return (
		<div className='dashboard-body-container'>
		</div>
	)
}

export default Dashboard;
