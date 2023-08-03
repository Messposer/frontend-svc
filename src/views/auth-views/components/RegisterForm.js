import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import {
  authenticated
} from "redux/actions";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { AUTH_ACTION_TYPES } from "redux/constants/Auth";
import { rules } from "validations/register";
import { DASHBOARD_PREFIX_PATH } from "configs/AppConfig";

export const RegisterForm = (props) => {
  const {
    authenticated,
  } = props;
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSignUp = () => {
    form.validateFields().then((values) => {
      showLoading(true);
      AuthService.signUp(values)
        .then((response) => {
          localStorage.setItem(
            AUTH_ACTION_TYPES.AUTH_TOKEN,
            response?.token
          );
          localStorage.setItem(
            AUTH_ACTION_TYPES.REFRESH_TOKEN,
            response?.refresh_token
          );
          authenticated(response);
          navigate(`${DASHBOARD_PREFIX_PATH}`);
        })
        .catch((e) => {
          setMessage(
            e?.response?.data?.errors
              ? e?.response?.data?.errors
              : [
                  ERROR_MESSAGES.NETWORK_CONNECTIVITY
                ]
          );
        }).finally(() => {
          showLoading(false);
        });
    });
  };

  
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        role="registerForm"
        onFinish={onSignUp}
      >
        <Form.Item
          name="username"
          label="Name"
          rules={rules.name}
          hasFeedback
          validateFirst={true}
        >
          <Input
            autoComplete="off"
            placeholder="Enter your first name"
            maxLength={50}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={rules.email}
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
          rules={rules.password}
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
          <Alert
            type="error"
            showIcon
            message={message}
          ></Alert>
        }

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign Up
          </Button>
        </Form.Item>

        <div
          className={`'d-flex justify-content-between w-100 align-items-center text-primary`}
        >
          <Link to="/">
            <span >I have an account</span>
          </Link>
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const {  authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = {
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
