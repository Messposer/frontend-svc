import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import {
  authenticated
} from "redux/actions";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { DASHBOARD_PREFIX_PATH, ERROR_MESSAGES } from "configs/AppConfig";
import { AUTH_ACTION_TYPES } from "redux/constants/Auth";
import { LoginType } from "services/types/AuthServiceType";
// import { rules } from "validations/register";

const LoginForm: React.FC = (props: any) => {
  const {
    authenticated,
  } = props;
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSignUp = async () => {
    form.validateFields()
    .then( async(values: LoginType) => {
      setMessage(null);
      showLoading(true);
      try {
        const response = await AuthService.login(values);
        const { accessToken, refreshToken } = response?.token;
        localStorage.setItem(AUTH_ACTION_TYPES.AUTH_TOKEN,accessToken);
        localStorage.setItem(AUTH_ACTION_TYPES.REFRESH_TOKEN,refreshToken);
        authenticated(response);
        navigate(`${DASHBOARD_PREFIX_PATH}`);
      } catch (error: any) {
        setMessage(
          error?.response?.data?.data
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
      name="register-form"
      role="registerForm"
      onFinish={onSignUp}
    >
      <Form.Item
        name="email"
        label="Email"
        // rules={rules.email}
        hasFeedback
        validateFirst={true}
      >
        <Input
          autoComplete="off"
          placeholder="Enter your email address..."
          maxLength={50}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        // rules={rules.password}
        hasFeedback
        validateFirst={true}
      >
        <Input.Password
          autoComplete="off"
          placeholder="Create password"
          maxLength={50}
        />
      </Form.Item>
      {message &&
        <div
          className="mb-3"
        >
          <Alert
            type="error"
            showIcon
            message={message}
          ></Alert>
        </div>
      }

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Sign In
        </Button>
      </Form.Item>

      <div
        className={`'d-flex justify-content-between w-100 align-items-center text-primary`}
      >
        <Link to="/register">
          <span >Create account</span>
        </Link>
      </div>
    </Form>
  );
};

const mapStateToProps = (data:any) => {
  const auth = data?.auth;
  const {  authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
