import { APP_NAME } from 'configs/AppConfig';
import React from 'react';

const Logo: React.FC = (props: any) => {

  return (
    <div className="logo">
      <div className="d-flex justify-content-start align-items-center">
        <img src='/img/logo.png' height={50} alt={`${APP_NAME} logo`}/>
      </div>
    </div>
  );
};

export default Logo;
