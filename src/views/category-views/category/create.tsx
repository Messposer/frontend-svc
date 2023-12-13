import { Button, Form, Input } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate, Link } from "react-router-dom";
import { rules } from "validations/contact";
import { useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { TeamOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { SaveCategoryPayloadType } from "services/types/UserServiceType";
import UserService from "services/UserService";

interface CreateContactProps {
  title: string
}
const { TextArea } = Input;
const CreateContact = ({ title }: CreateContactProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: SaveCategoryPayloadType) => {
    try {
			await withLoading(UserService.StoreACategory(values));
      form.resetFields();
			toast.success('Category added successfully');
      navigate("/categories");
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  return (
    <div className='p-3 chat-body-container'>
      <div className="row">
        <div className="p-4 bg-white col-md-7">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-title">Create a new category</h4>
            <Link to="..">
              Back
            </Link>
          </div>
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            role="registerForm"
            onFinish={onCreate}
          >
            <Form.Item
              name="title"
              label="Category Title"
              rules={rules.category_name}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter category name"
                maxLength={50}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Category Description"
              hasFeedback
              rules={rules.category_description}
              validateFirst={true}
            >
              <TextArea 
                rows={4}
                autoComplete="off"
                placeholder="Enter category description"
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
                Create Category
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