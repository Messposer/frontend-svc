import React, { useState } from "react";
import AuthService from "services/AuthService";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { HandleErrors } from "services/error/handleErrors";
import { Button } from "antd";
import { LoginType } from "services/types/AuthServiceType";


const LoginForm: React.FC = () => {

  const [loading, showLoading] = useState<boolean>(false);
  const [message, setMessage] = useState(null);

  const onLogin = async () => {
    setMessage(null);
    showLoading(true);
    const credentials: LoginType = {
      email: "sola@codeitmi.ng",
      password: "password"
    }
    try {
      const response = await AuthService.login(credentials);
      console.log(response);
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message ?? ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
    } finally {
      showLoading(false);
    }
  };

  return (
    <div className="p-5">
      <Button 
        loading={loading}
        size="large"
        type="primary"
        onClick={onLogin}
      >
        Login
      </Button>
      {message &&
        <HandleErrors errors={message} />
      }
    </div>
  );
};

export default LoginForm;
