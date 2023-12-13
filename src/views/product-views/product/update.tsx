import { Button, Form, Input, Select, message } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { rules } from "validations/contact";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { toast } from 'sonner';
import { TeamOutlined } from '@ant-design/icons';
import { CategoryType, ProductType } from "redux/types";
import { SaveCategoryPayloadType } from "services/types/UserServiceType";
import UserService from "services/UserService";

interface UpdateProductProps {
  title: string
}
const { TextArea } = Input;

const UpdateProduct = ({ title }: UpdateProductProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [categoryLoading, withCategoryLoading] = useLoading();
	const [productLoading, withProductLoading] = useLoading();
	const [Loading, withLoading] = useLoading();
	const [categories, setCategories] = useState<CategoryType[]>([]);
  const [product, setProduct] = useState<ProductType>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: SaveCategoryPayloadType) => {
    try {
			await withLoading(UserService.UpdateAProduct(id, values));
			toast.success('Product updated successfully');
      navigate("/products");
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await withProductLoading(UserService.getAProduct(id));
        setProduct(product);
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    };
  
    const getCategories = async () => {
      try {
        const categories = await withCategoryLoading(UserService.getAllCategories());
        setCategories(categories?.data?.categories);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
    getCategories();
  }, []);

  const CategoryOptions = categories && categories.length > 0 ? (
    <>
      {categories.map((category: CategoryType) => (
        <Select.Option key={category.id} value={category.id}>{`${category.title}`}</Select.Option>
      ))}
    </>
  ) : null;

  return (
    <div className='p-3 contact-body-container'>
      {!productLoading && 
      <>
        <div className="row">
          <div className="p-3 bg-white col-md-7">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-title">Update product</h4>
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
              initialValues={product}
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
                label="Category Title"
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
                label="Category Description"
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
              {errorMessage &&
                <HandleErrors errors={errorMessage} />
              }
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={Loading}
                  className="custom-button custom-button-lg custom-primary-button"
                  icon={<TeamOutlined />}
                >
                  Update Product
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

export default UpdateProduct;