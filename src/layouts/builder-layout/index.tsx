import { Routes, Route, } from "react-router-dom";
import { Layout } from 'antd';
import TemplateBuilderViews from "views/builder-views";

const TemplateBuilderLayout = () => {
	return (
		<div className="template-container">
			<Layout>
				<Layout className="site-layout">
          <Routes>
            <Route path="/*" element={<TemplateBuilderViews/>} />
          </Routes>
				</Layout>
			</Layout>
		</div>
	)
}

export default TemplateBuilderLayout;
