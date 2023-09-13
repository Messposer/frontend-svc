import { Button, Form, Input, message } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactType } from "redux/types";
import ContactService from "services/ContactService";
import { rules } from "validations/contact";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
interface UpdateContactProps {
  title: string
}
const { TextArea } = Input;
const UpdateContact = ({ title }: UpdateContactProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
	const [getLoading, getWithLoading] = useLoading();
	const [messageApi, contextHolder] = message.useMessage();
  const [contact, setContact] = useState<ContactType>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: ContactType) => {
    try {
			await withLoading(ContactService.updateContact(values, id));
			await messageApi.success('Contact updated successfully');
      navigate("/contacts");
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  const getContact = async () => {
    try {
			const contact = await getWithLoading(ContactService.getContact(id));
      setContact(contact);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div className='p-5 chat-body-container'>
      {!getLoading && 
      <>
        <h4>Update a contact</h4>
        {contextHolder}
        <div className="row">
          <div className="p-3 bg-white col-md-7">
            <Form
              form={form}
              layout="vertical"
              name="register-form"
              role="registerForm"
              onFinish={onCreate}
              initialValues={contact}
            >
              <div className="row">
                <div className="col-md-6">
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
                    />
                  </Form.Item>
                </div>
                <div className="col-md-6">
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
                />
              </Form.Item>

              <Form.Item
                name="number"
                label="Number"
                rules={rules.last_name}
                hasFeedback
                validateFirst={true}
              >
                <Input
                  autoComplete="off"
                  placeholder="Enter contact phone number"
                  maxLength={50}
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                hasFeedback
                validateFirst={true}
              >
                <TextArea 
                  rows={4}
                  autoComplete="off"
                  placeholder="Enter contact address"
                  maxLength={50}
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
                />
              </Form.Item>
              {errorMessage &&
                <HandleErrors errors={errorMessage} />
              }
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create Contact
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="col-md-5">
            <div className="alert alert-info">
              This is an effort which was created in order to bridge the existing 
              gap between the theory taught in the classroom and practice science, 
              Agriculture, Medicine, Engineering, Technology and other professional 
              programs in the Nigerian tertiary institutions. This program is aimed at 
              exposing the students to the use of various machines and equipment, 
              professional work methods and ways of safe-guarding the work areas in 
              industries as well as other organizations and parastatals. 
            </div>
            <div className="alert alert-warning">
              This is an effort which was created in order to bridge the existing 
              gap between the theory taught in the classroom and practice science, 
              Agriculture, Medicine, Engineering, Technology and other professional 
              programs in the Nigerian tertiary institutions. This program is aimed at 
              exposing the students to the use of various machines and equipment, 
              professional work methods and ways of safe-guarding the work areas in 
              industries as well as other organizations and parastatals. 
            </div>
          </div>
        </div>
      </>
      }
    </div>
  )
};

export default UpdateContact;