import React, { ReactNode } from 'react';
import { toast } from 'sonner';
import {
	EditOutlined,
} from '@ant-design/icons';
import MomentTime from 'components/Moment';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  content: ReactNode;
  duration?: number;
  date?: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, title, content, date=null, duration = 5000 }) => {
  const showToast = () => {
    // message[type]({
    //   content: (
    //     <div className={`custom-toast ${type}`}>
    //       {title && <h5 className="custom-toast-title">{title}</h5>}
    //       <div className="custom-toast-content">{content}</div>
    //     </div>
    //   ),
    //   duration,
    //   className:`custom-wrapper ${type}`
    // });
    toast.error(
      <div className={`custom-toast ${type} bg-white`}>
        {title && <h5 className="custom-toast-title">{title}</h5>}
        <div className="custom-toast-content">{content}</div>
        {
          date &&
          <div className="custom-toast-date text-right"><MomentTime type='relative' date={date} /></div>
        }
      </div>, {
        duration,
        description: title,
        icon: <EditOutlined />,
        className: `custom-wrapper ${type} p-0`
      }
    );
  }

  return (
    <>
      {showToast()}
    </>
  );
}

export default CustomToast;
