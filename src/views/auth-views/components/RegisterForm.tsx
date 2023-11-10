import { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { authenticated } from "redux/actions";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { AUTH_ACTION_TYPES } from "redux/constants/Auth";
import { DASHBOARD_PREFIX_PATH } from "configs/AppConfig";
import { RootState } from "redux/types/Root";
import { RegisterType } from "services/types/AuthServiceType";
import { HandleErrors } from "services/error/handleErrors";
import { UserAddOutlined } from '@ant-design/icons';

type FieldType = {
  email?: string;
  password?: string;
  username?: string;
};

const RegisterForm: React.FC = (props: any) => {
  const { authenticated } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSignUp = async () => {
    form.validateFields()
    .then(async (values: RegisterType) => {
      showLoading(true);
      try {
        const response = await AuthService.signUp(values);
        const { accessToken, refreshToken } = response?.token;
        localStorage.setItem(AUTH_ACTION_TYPES.AUTH_TOKEN,accessToken);
        localStorage.setItem(AUTH_ACTION_TYPES.REFRESH_TOKEN,refreshToken);
        authenticated(response);
        navigate(`${DASHBOARD_PREFIX_PATH}`);
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
      name="register-form"
      onFinish={onSignUp}
    >
      <Form.Item<FieldType>
        name="username"
        label="Name"
        hasFeedback
        validateFirst={true}
        rules={[
          {required: true,message: "Please input your name"}
        ]}
      >
        <Input
          autoComplete="off"
          className="custom-input"
          placeholder="Enter your first name"
          maxLength={50}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="email"
        label="Email"
        hasFeedback
        rules={[
          {type: "email",message: "Please enter email address in format “youremail@example.com”"}, 
          {required: true,message: "Please input your email",}
        ]}
        validateFirst={true}
      >
        <Input
          autoComplete="off"
          className="custom-input"
          placeholder="Enter your email address..."
          maxLength={50}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        label="Password"
        hasFeedback
        validateFirst={true}
        rules={[
          {required: true,message: "Please input your password"}
        ]}
      >
        <Input.Password
          autoComplete="off"
          className="custom-input"
          placeholder="Create password"
          maxLength={50}
        />
      </Form.Item>

      {message &&
        <HandleErrors errors={message} />
      }

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          block 
          loading={loading}
          size="large"
          className="custom-button custom-button-auth custom-primary-button"
          icon={<UserAddOutlined />} 
        >
          Sign Up
        </Button>
      </Form.Item>

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

const mapDispatchToProps = {
  authenticated,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
