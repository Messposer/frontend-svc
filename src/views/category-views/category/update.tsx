import { Button, Form, Input, message } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rules } from "validations/contact";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { toast } from 'sonner';
import { TeamOutlined } from '@ant-design/icons';
import { CategoryType } from "redux/types";
import { SaveCategoryPayloadType } from "services/types/UserServiceType";
import UserService from "services/UserService";
interface UpdateContactProps {
  title: string
}
const { TextArea } = Input;
const UpdateContact = ({ title }: UpdateContactProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
	const [getLoading, getWithLoading] = useLoading();
  const [category, setCategory] = useState<CategoryType>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: SaveCategoryPayloadType) => {
    try {
			await withLoading(UserService.UpdateACategory(id, values));
			toast.success('Category updated successfully');
      navigate("/categories");
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  const getCategory = async () => {
    try {
			const category = await getWithLoading(UserService.getACategory(id));
      setCategory(category);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className='p-3 contact-body-container'>
      {!getLoading && 
      <>
        <div className="row">
          <div className="p-3 bg-white col-md-7">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-title">Update contact</h4>
              <Link to="..">
                Back
              </Link>
            </div>
            <hr />
            <Form
              form={form}
              layout="vertical"
              name="register-form"
              role="registerForm"
              onFinish={onCreate}
              initialValues={category}
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
                  className="custom-button custom-button-lg custom-primary-button"
                  icon={<TeamOutlined />}
                >
                  Update Category
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </>
      }
    </div>
  )
};

export default UpdateContact;