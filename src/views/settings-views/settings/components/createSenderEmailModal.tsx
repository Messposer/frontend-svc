import { Button, Form, Input, Modal } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { rules } from "validations/contact";
import { useEffect, useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { TeamOutlined } from '@ant-design/icons';
import SettingsService from "services/SettingsService";
import { AddNewSenderEmailType } from "services/types/SettingsSerivceType";
import { toast } from 'sonner';
 
interface CreateSenderEmailModalProps {
  title: string;
  senderEmailId: string | null;
  onClose: () => void;
  isOpen: boolean;
}

const CreateSenderEmailModal = ({ title, onClose, isOpen }: CreateSenderEmailModalProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: AddNewSenderEmailType) => {
    try {
			await withLoading(SettingsService.addNewSenderEmail(values));
      form.resetFields();
      onClose();
      toast.success('Email has been add, confirm this email');
      setErrorMessage(null);
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
      form.resetFields();
		}
  }

  return (
    <Modal
      width={500}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <div className='create-from-email-body-container'>
        <div className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-title">Add a new email</h4>
          </div>
          <h5 className="text-sub-title pt-1">The email will have to be verify before it can be use</h5>
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            role="registerForm"
            onFinish={onCreate}
          >
            <Form.Item<AddNewSenderEmailType>
              name="email"
              label="Email"
              rules={rules.email}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter your email address"
                maxLength={50}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item<AddNewSenderEmailType>
              name="senderName"
              label="Sender Name"
              rules={rules.sender_name}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter Email Sender Name"
                maxLength={50}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item<AddNewSenderEmailType>
              name="dns"
              label="Custom DNS (Optional)"
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Custom"
                maxLength={100}
                className="custom-input"
              />
            </Form.Item>
            
            {errorMessage &&
              <HandleErrors errors={errorMessage} isToast={true} />
            }
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                icon={<TeamOutlined />}
                className="custom-button custom-button-auth custom-primary-button"
              >
                Add from email
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  )
};

export default CreateSenderEmailModal;