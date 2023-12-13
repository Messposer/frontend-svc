import { Button, Form, Input, Select, Upload } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate, Link } from "react-router-dom";
import { rules } from "validations/contact";
import { useEffect, useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { TeamOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import UserService from "services/UserService";
import { CategoryType } from "redux/types";
import { UpdateProductPayloadType } from "services/types/UserServiceType";

interface CreateProductProps {
  title: string
}
const { TextArea } = Input;

const CreateProduct = ({ title }: CreateProductProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, withLoading] = useLoading();
	const [categoryLoading, withCategoryLoading] = useLoading();
  const navigate = useNavigate();
	const [categories, setCategories] = useState<CategoryType[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: UpdateProductPayloadType) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category_id', values.category_id);
      try {
      	await withLoading(UserService.StoreAProduct(formData));
        form.resetFields();
      	toast.success('Product added successfully');
        navigate("/products");
      } catch (error:any ) {
      	setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }
  }

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {  
    const getCategories = async () => {
      try {
        const categories = await withCategoryLoading(UserService.getAllCategories());
        setCategories(categories?.data?.categories);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  const CategoryOptions = categories && categories.length > 0 ? (
    <>
      {categories.map((category: CategoryType) => (
        <Select.Option key={category.id} value={category.id}>{`${category.title}`}</Select.Option>
      ))}
    </>
  ) : null;

  const handleFileChange = (info: any) => {
    setSelectedFile(info.file);
  };

  return (
    <div className='p-3 chat-body-container'>
      <div className="row">
        <div className="p-4 bg-white col-md-7">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-title">Add a new photo</h4>
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
              name="category_id"
              label="Category "
              rules={rules.product_category}
              hasFeedback
              validateFirst={true}
            >
              <Select
                showSearch
                placeholder="Select category"
                loading={categoryLoading}
                className="custom-select"
              >
                {CategoryOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="title"
              label="Product Title"
              rules={rules.product_name}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter product name"
                maxLength={50}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Product Description"
              hasFeedback
              rules={rules.product_description}
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
            <Form.Item 
              label="Select Photo">
              <Form.Item 
                name="photo" 
                valuePropName="fileList" 
                getValueFromEvent={normFile} 
                noStyle
              >
                <Upload.Dragger 
                  name="file" 
                  accept="image"
                  beforeUpload={() => false} 
                  showUploadList={false}
                  onChange={handleFileChange}
                >
                  <p className="ant-upload-drag-icon">
                    {/* <InboxOutlined /> */}
                  </p>
                  <p className="ant-upload-text">Click or drag photo to this area to upload</p>
                </Upload.Dragger>
              </Form.Item>
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

export default CreateProduct;