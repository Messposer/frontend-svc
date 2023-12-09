import { APP_NAME } from 'configs/AppConfig';
import React from 'react';

interface LogoProps {
  collapsed: boolean;
}
const Logo: React.FC<LogoProps> = ({collapsed}) => {

  return (
    <div className="logo">
      <div className="d-flex justify-content-center align-items-center mt-3">
        {
          collapsed &&
          <img src='/img/logoIcon.png' height={35} alt={`${APP_NAME} logo`}/>
        }
        {
          !collapsed &&
          <img src='/img/logo.png' height={45} alt={`${APP_NAME} logo`}/>
        }
      </div>
    </div>
  );
};

export default Logo;
