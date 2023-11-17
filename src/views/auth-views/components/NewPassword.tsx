import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { ResetPasswordType } from "services/types/AuthServiceType";
import { RootState } from "redux/types/Root";
import { HandleErrors } from "services/error/handleErrors";
import { LoginOutlined } from '@ant-design/icons';
import { RESET_CODE_TYPE } from "redux/types";
import { toast } from "sonner";

type FieldType = {
  confirmPassword?: string;
  password?: string;
};

interface NewPasswordFormProps {
  resetCode: RESET_CODE_TYPE | null
}

const NewPasswordForm = ({ resetCode }: NewPasswordFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const validateConfirmPassword = async (_: any, value: string) => {
    const newPassword = form.getFieldValue('password');
    if (value && newPassword && value !== newPassword) {
      throw new Error('Password must match');
    }
  };

  const onLogin = async () => {
    form.validateFields()
    .then( async(values: ResetPasswordType) => {
      setMessage(null);
      showLoading(true);
      try {
        if(resetCode){
          const resetPasswordPayload: ResetPasswordType = {
            code: resetCode.code,
            password: values.password
          }
          await AuthService.reset(resetPasswordPayload);
          toast.success('Password reset successful, login');
          navigate('/');
        }
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
        name="password"
        label="Password"
        hasFeedback
        rules={[
          {required: true,message: "Please input your password",}
        ]}
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Create password"
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="confirmPassword"
        label="Confirm Password"
        hasFeedback
        rules={[
          { required: true, message: 'Confirm your new password' },
          { validator: validateConfirmPassword },
        ]}
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Confirm password"
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      {message &&
        <HandleErrors errors={message} isToast={true} />
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
          Reset Password
        </Button>
      </Form.Item>

      <div className="w-100 text-sub-title"> 
        Are you new here?
        <Link to="/register">
          <span>{" "}Create account</span>
        </Link>
      </div>
      <div className="w-100 text-sub-title"> 
        Did you forgot your password, hmmm?
        <Link to="/forgot">
          <span>{" "}Recover password</span>
        </Link>
      </div>
    </Form>
  );
};

const mapStateToProps = ({auth}: RootState) => {
  const {  resetCode } = auth;
  return { resetCode };
};

export default connect(mapStateToProps)(NewPasswordForm);
