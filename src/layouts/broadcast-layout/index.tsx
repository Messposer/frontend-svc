import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import BroadCastViews from "views/contact-views copy";
const { Content } = Layout;

const BroadCastLayout = () => {
	return (
		<div className="contact-container">
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
							<Route path="/*" element={<BroadCastViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default BroadCastLayout;
