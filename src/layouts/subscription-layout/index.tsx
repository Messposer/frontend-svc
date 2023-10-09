import React from 'react';
import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import UserSubscriptionViews from 'views/subscription-views';
const { Content } = Layout;

export const SubscriptionLayout: React.FC = () => {

	return (
		<div className="subscription-container">
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
							<Route path="/*" element={<UserSubscriptionViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}


export default SubscriptionLayout
