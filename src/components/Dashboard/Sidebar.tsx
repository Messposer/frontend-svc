import { useState } from 'react';
import { Layout, Collapse, Button } from 'antd';
import {
  AppstoreOutlined, SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClusterOutlined,
  FileTextOutlined,
  FileImageOutlined,
  CreditCardOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import {
  DASHBOARD_PREFIX_PATH,
  SETTINGS_PREFIX_PATH,
  CONTACT_PREFIX_PATH,
  CONTACT_GROUP_PREFIX_PATH,
  SCHEDULE_PREFIX_PATH,
  TEMPLATE_PREFIX_PATH,
  MEDIA_PREFIX_PATH,
  SUBSCRIPTION_PREFIX_PATH,
  CHAT_PREFIX_PATH,
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
              <li className={`${location?.pathname === CONTACT_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CONTACT_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <TeamOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Contacts</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === CHAT_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CHAT_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <TeamOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Messages</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === CONTACT_GROUP_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CONTACT_GROUP_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <ClusterOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Broadcast Lists</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === SCHEDULE_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${SCHEDULE_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <CalendarOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Schedule Jobs</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === MEDIA_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${MEDIA_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <FileImageOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Media</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === TEMPLATE_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${TEMPLATE_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <FileTextOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Email Template</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === SUBSCRIPTION_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${SUBSCRIPTION_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <CreditCardOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Subscription Plan</span>}
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === SETTINGS_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${SETTINGS_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <SettingOutlined className='left-sider-nav-icon' />
                    {!collapsed && <span className='ms-2'>Sending Settings</span>}
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
