import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { VerifyCodeType } from "services/types/AuthServiceType";
import { RootState } from "redux/types/Root";
import { HandleErrors } from "services/error/handleErrors";
import { LoginOutlined } from '@ant-design/icons';
import { saveResetCode } from "redux/actions";
import { RESET_CODE_TYPE } from 'redux/types';

type FieldType = {
  code: number;
};

interface VerifyCodeFormProps {
  saveResetCode: (payload: RESET_CODE_TYPE) => void,
}

const VerifyCodeForm = ({saveResetCode}: VerifyCodeFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, showLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSend = async () => {
    form.validateFields()
    .then( async(values: VerifyCodeType) => {
      setMessage(null);
      showLoading(true);
      try {
        const verifyCodePayload: VerifyCodeType = {
          code: Number(values.code)
        };
        const response = await AuthService.verify(verifyCodePayload);
        saveResetCode(response);
        navigate("/new/password");
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
        name="code"
        label="Code"
        rules={[
          {required: true,message: "Please input the code sent to your email",}
        ]}
        hasFeedback
        validateFirst={true}
      >
        <Input
          autoComplete="off"
          type="number"
          placeholder="Enter the code sent email address..."
          maxLength={50}
          className="custom-input"
        />
      </Form.Item>

      {message &&
        <HandleErrors errors={message} isToast={true}/>
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
          Verify
        </Button>
      </Form.Item>

      <div className="w-100 text-sub-title"> 
        Change email?
        <Link to="/forgot">
          <span>{" "}Go Back</span>
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
  saveResetCode
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeForm);
