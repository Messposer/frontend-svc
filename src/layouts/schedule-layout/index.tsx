import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import ScheduleViews from "views/schedule-views";
const { Content } = Layout;

const ScheduleLayout = () => {
	return (
		<div className="schedule-container">
			<Layout>
				<Sidebar />
				<Layout className="site-layout">
					<Content
						style={{
							height: '100vh',
						}}
					>
						<HeaderNav />
						<Routes>
							<Route path="/*" element={<ScheduleViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default ScheduleLayout;
