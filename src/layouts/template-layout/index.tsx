import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import TemplateViews from "views/template-views";
const { Content } = Layout;

const TemplateLayout = () => {
	return (
		<div className="template-container">
			<Layout>
				<Sidebar />
				<Layout className="site-layout">
					<Content>
						<HeaderNav />
						<Routes>
							<Route path="/*" element={<TemplateViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default TemplateLayout;
