import {
  AppstoreOutlined,
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClusterOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import {
  DASHBOARD_PREFIX_PATH, 
  SETTING_PREFIX_PATH,
  CONTACT_PREFIX_PATH,
  CONTACT_GROUP_PREFIX_PATH,
  SCHEDULE_PREFIX_PATH
} from "configs/AppConfig";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider 
      trigger={null} 
      collapsible 
      collapsed={false}
      className='left-slider-wrapper'
      width={300}
    >
      <Logo />
      <div className="mt-4 left-sider-nav-container">
        <div className="left-sider-nav-wrapper">
          <h4 className="left-sider-nav-heading mt-5">MAIN MENU</h4>
          <div className="mt-3">
            <ul className="left-sider-nav-item">
              <li className={`${location?.pathname === DASHBOARD_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${DASHBOARD_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <AppstoreOutlined className='left-sider-nav-icon'/> 
                    <span className='ms-2'>Overview</span>
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === SCHEDULE_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${SCHEDULE_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <CalendarOutlined className='left-sider-nav-icon'/> 
                    <span className='ms-2'>Schedule Jobs</span>
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === CONTACT_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CONTACT_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <TeamOutlined className='left-sider-nav-icon'/> 
                    <span className='ms-2'>Contacts</span>
                  </div>
                </Link>
              </li>
              <li className={`${location?.pathname === CONTACT_GROUP_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${CONTACT_GROUP_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <ClusterOutlined className='left-sider-nav-icon'/> 
                    <span className='ms-2'>Broadcast lists</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-3 left-sider-nav-wrapper">
          <h4 className="left-sider-nav-heading">PREFERENCES</h4>
          <div className="mt-3">
            <ul className="left-sider-nav-item">
              <li className={`${location?.pathname === SETTING_PREFIX_PATH ? "active" : ""}`}>
                <Link to={`${SETTING_PREFIX_PATH}`}>
                  <div className='d-flex align-items-center'>
                    <SettingOutlined className='left-sider-nav-icon'/> 
                    <span className='ms-2'>Settings</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
