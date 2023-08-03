import React from 'react'
import { Routes, Route, } from "react-router-dom";
import DashboardViews from 'views/dashboard-views';
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
const { Content } = Layout;

export const BoardingLayout: React.FC = () => {

	return (
		<div className="dashboard-container">
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
							<Route path="/*" element={<DashboardViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}


export default BoardingLayout
