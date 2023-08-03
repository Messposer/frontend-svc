import React from 'react';

const Logo: React.FC = (props: any) => {

  return (
    <div className="logo">
      <div className="d-flex justify-content-start align-items-center">
        <img src='/img/logo.png' alt=""/>
          <div className='company-name ms-2'>
            <h4 className='company-name-heading'>dashii</h4>
            <h4 className='company-name-sub-heading'>Business & Consulting</h4>
          </div>
      </div>
    </div>
  );
};

export default Logo;
