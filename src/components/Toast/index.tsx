import React, { ReactNode } from 'react';
import { message } from 'antd';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  content: ReactNode;
  duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({ type, title, content, duration = 3 }) => {
  const showToast = () => {
    message[type]({
      content: (
        <div className={`custom-toast ${type}`}>
          {title && <h5 className="custom-toast-title">{title}</h5>}
          <div className="custom-toast-content">{content}</div>
        </div>
      ),
      duration,
      className:`custom-wrapper ${type}`
    });
  }

  return (
    <>
      {showToast()}
    </>
  );
}

export default CustomToast;
