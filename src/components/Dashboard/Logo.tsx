import { APP_NAME } from 'configs/AppConfig';
import React from 'react';

const Logo: React.FC = (props: any) => {

  return (
    <div className="logo">
      <div className="d-flex justify-content-center align-items-center mt-3">
        <img src='/img/logo.png' height={45} alt={`${APP_NAME} logo`}/>
      </div>
    </div>
  );
};

export default Logo;
