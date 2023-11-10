import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { ForgotPasswordType } from "services/types/AuthServiceType";
import { RootState } from "redux/types/Root";
import { HandleErrors } from "services/error/handleErrors";
import { LoginOutlined } from '@ant-design/icons';

type FieldType = {
  email?: string;
};

const ForgotPasswordForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSend = async () => {
    form.validateFields()
    .then( async(values: ForgotPasswordType) => {
      setMessage(null);
      showLoading(true);
      try {
        const response = await AuthService.forgot(values);
        console.log(response);
        // navigate(`${DASHBOARD_PREFIX_PATH}`);
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
      onFinish={onSend}
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
          Send
        </Button>
      </Form.Item>

      <div className="w-100 text-sub-title"> 
        Are you new here?
        <Link to="/register">
          <span>{" "}Create account</span>
        </Link>
      </div>
      <div className="w-100 text-sub-title"> 
        You already have an account?
        <Link to="/">
          <span>{" "}Login now</span>
        </Link>
      </div>
    </Form>
  );
};

const mapStateToProps = ({auth}: RootState) => {
  const {  authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps, null)(ForgotPasswordForm);
