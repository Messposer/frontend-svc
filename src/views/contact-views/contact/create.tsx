import { Button, Form, Input, message } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate, Link } from "react-router-dom";
import { ContactType } from "redux/types";
import ContactService from "services/ContactService";
import { rules } from "validations/contact";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { TeamOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

interface CreateContactProps {
  title: string
}
const { TextArea } = Input;
const CreateContact = ({ title }: CreateContactProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: ContactType) => {
    try {
			await withLoading(ContactService.createContact(values));
      form.resetFields();
			toast.success('Contact added successfully');
      navigate("/contacts");
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const validatePhoneNumber = (_: any, value: string) => {
    try {
      if (!value || isValidPhoneNumber(value)) {
        return Promise.resolve();
      }
    } catch (error) {}

    return Promise.reject('Invalid phone number');
  };

  return (
    <div className='p-3 chat-body-container'>
      <div className="row">
        <div className="p-4 bg-white col-md-7">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-title">Create a new schedule list</h4>
            <Link to="..">
              Back
            </Link>
          </div>
          <hr />
          <h5 className="text-sub-title pt-1 mb-3">Provide your email and password to continue</h5>
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            role="registerForm"
            onFinish={onCreate}
          >
            <div className="row">
              <div className="col-md-6 ps-0">
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={rules.first_name}
                  hasFeedback
                  validateFirst={true}
                >
                  <Input
                    autoComplete="off"
                    placeholder="Enter contact first name"
                    maxLength={50}
                    className="custom-input"
                  />
                </Form.Item>
              </div>
              <div className="col-md-6 pe-0">
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  rules={rules.last_name}
                  hasFeedback
                  validateFirst={true}
                >
                  <Input
                    autoComplete="off"
                    placeholder="Enter contact last name"
                    maxLength={50}
                    className="custom-input"
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item
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
            
            <Form.Item 
              name="number" 
              label="Phone Number"
              rules={[{ required: true, validator: validatePhoneNumber }]}
            >
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                initialValueFormat="national"
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter contact address"
                maxLength={50}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="note"
              label="Note"
              hasFeedback
              validateFirst={true}
            >
              <TextArea 
                rows={4}
                autoComplete="off"
                placeholder="Add note to contact"
                maxLength={50}
                className="custom-textarea"
              />
            </Form.Item>
            {errorMessage &&
              <HandleErrors errors={errorMessage} />
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
                Create Contact
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-5">
          <AlertInfo />
          <AlertWarning />
        </div>
      </div>
    </div>
  )
};

export default CreateContact;