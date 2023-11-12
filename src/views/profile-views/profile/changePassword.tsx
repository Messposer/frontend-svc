import { useState } from "react";
import { Button, Form, Input } from "antd";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { ChangePasswordType } from "services/types/AuthServiceType";
import { HandleErrors } from "services/error/handleErrors";
import { LoginOutlined } from '@ant-design/icons';

interface FieldType {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
};


const ChangePassword = () => {
  const [form] = Form.useForm();
  
  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);
  
  const validateConfirmPassword = async (_: any, value: string) => {
    const newPassword = form.getFieldValue('newPassword');
    if (value && newPassword && value !== newPassword) {
      throw new Error('Password must match');
    }
  };

  const onLogin = async () => {
    form.validateFields()
    .then( async(values: ChangePasswordType) => {
      setMessage(null);
      showLoading(true);
      try {
        const changePasswordPayload: ChangePasswordType = {
          newPassword: values.newPassword,
          oldPassword: values.oldPassword,
        }
        await AuthService.changePassword(changePasswordPayload);
      } catch (error: any) {
        setMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      } finally {
        showLoading(false);
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="login-form"
      onFinish={onLogin}
    >
      <Form.Item<FieldType>
        name="oldPassword"
        label="Old Password"
        hasFeedback
        rules={[
          {required: true,message: "Please input your old password",}
        ]}
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Old password"
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="newPassword"
        label="New Password"
        hasFeedback
        rules={[
          {required: true,message: "Please input your new password",}
        ]}
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Create New password"
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="confirmPassword"
        label="Confirm New Password"
        hasFeedback
        rules={[
          { required: true, message: 'Confirm your new password' },
          { validator: validateConfirmPassword },
        ]}
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Confirm New password"
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      {message &&
        <HandleErrors errors={message} />
      }

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="custom-button custom-button-auth custom-primary-button"
          size="large"
          icon={<LoginOutlined />} 
          block
          loading={loading}>
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
