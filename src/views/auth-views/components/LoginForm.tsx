import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Checkbox } from "antd";
import {
  authenticated
} from "redux/actions";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { DASHBOARD_PREFIX_PATH, ERROR_MESSAGES } from "configs/AppConfig";
import { AUTH_ACTION_TYPES } from "redux/constants/Auth";
import { LoginType } from "services/types/AuthServiceType";
import { RootState } from "redux/types/Root";
import { HandleErrors } from "services/error/handleErrors";
import { LoginOutlined } from '@ant-design/icons';
import { toast } from "sonner";

type FieldType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

const LoginForm: React.FC = (props: any) => {
  const { authenticated } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onLogin = async () => {
    form.validateFields()
    .then( async(values: LoginType) => {
      setMessage(null);
      showLoading(true);
      try {
        const response = await AuthService.login(values);
        localStorage.setItem(AUTH_ACTION_TYPES.AUTH_TOKEN,response?.data?.token);
        toast.success('Login successful, welcome back');
        authenticated(response?.data);
        navigate(`${DASHBOARD_PREFIX_PATH}`);
      } catch (error: any) {
        setMessage(
          error?.response?.data?.data?.MESSAGE
            ? error?.response?.data?.data?.MESSAGE
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
        name="email"
        label="Email"
        rules={[
          {type: "email",message: "Please enter email address in format “youremail@example.com”"}, 
          {required: true,message: "Please input your email",}
        ]}
        hasFeedback
        validateFirst={true}
      >
        <Input
          autoComplete="off"
          placeholder="Enter your email address..."
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        label="Password"
        hasFeedback
        rules={[
          {required: true,message: "Please input your last name",}
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
        name="rememberMe"
        className="custom-checkbox"
      >
        <Checkbox
          className="custom-checkbox"
        >
          Keep me logged in
        </Checkbox>
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
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = ({auth}: RootState) => {
  const {  authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
