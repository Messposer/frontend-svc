import { useState } from 'react';
import { Layout, Button } from 'antd';
import {
  AppstoreOutlined, MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import {
  CATEGORY_PREFIX_PATH,
  DASHBOARD_PREFIX_PATH,
  PRODUCT_PREFIX_PATH
} from "configs/AppConfig";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className='left-slider-wrapper'
      width={250}
    >
      <Logo collapsed={collapsed}/>
      <div className="mt-4 left-sider-nav-container">
        <div className="left-sider-nav-wrapper">
          <div className="mt-3">
            <ul className="left-sider-nav-item">
              <li className={`${location?.pathname === DASHBOARD_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${DASHBOARD_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <AppstoreOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Overview</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === CATEGORY_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CATEGORY_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <AppstoreOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Category</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === PRODUCT_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${PRODUCT_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <AppstoreOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Photos</span>}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleToggleCollapse}
            className="toggle-button"
          />
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
