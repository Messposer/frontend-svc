import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import Sidebar from 'components/Dashboard/Sidebar';
import HeaderNav from 'components/Dashboard/Header';
import ProductViews from "views/product-views";
const { Content } = Layout;

const ProductLayout = () => {
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
							<Route path="/*" element={<ProductViews/>} />
						</Routes>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}

export default ProductLayout;
