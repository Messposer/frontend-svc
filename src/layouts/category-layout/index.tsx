import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import CategoryViews from "views/category-views";
const { Content } = Layout;

const CategoryLayout = () => {
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
							<Route path="/*" element={<CategoryViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default CategoryLayout;
