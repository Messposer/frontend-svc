import React from 'react';

const UpgradePlan: React.FC = (props: any) => {

  return (
    <div className="upgrade-wrapper text-center">
      <h4 className='upgrade-text-heading'>Upgrade to Enterprise Account!</h4>
      <h4 className='upgrade-text-sub-heading'>Increase your sales by using special features of Enterprise Membership.</h4>
      <div className='mt-4'>
        <span
          className='secondary-btn'
        >
          Upgrade
        </span>
      </div>
    </div>
  );
};

export default UpgradePlan;
