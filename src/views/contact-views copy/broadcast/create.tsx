import { Button, Form, Input } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { BroadCastType } from "redux/types";
import ContactService from "services/ContactService";
import { rules } from "validations/contact";
import { useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { CONTACT_GROUP_PREFIX_PATH, ERROR_MESSAGES } from "configs/AppConfig";
import { ClusterOutlined } from '@ant-design/icons';
import { toast } from "sonner";
interface CreateBroadCastProps {
  title: string
}
const { TextArea } = Input;
const CreateBroadCast = ({ title }: CreateBroadCastProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreate = async (values: BroadCastType) => {
    try {
			await withLoading(ContactService.createBroadCast(values));
      form.resetFields();
			toast.success('Broadcast list added successfully');
      navigate(CONTACT_GROUP_PREFIX_PATH);
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
      <h4>Create a new broadcast list</h4>
      <div className="row">
        <div className="p-3 bg-white col-md-7">
          <Form
            form={form}
            layout="vertical"
            name="create-broadcast-form"
            onFinish={onCreate}
          >
            <Form.Item
              name="name"
              label="Broadcast name"
              rules={rules.broadCastName}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter your broadcast name"
                maxLength={100}
                className="custom-input"
              />
            </Form.Item>
            
            <Form.Item
              name="note"
              label="Add a note to this broadcast"
              hasFeedback
              validateFirst={true}
            >
              <TextArea 
                rows={4}
                autoComplete="off"
                placeholder="Enter contact address"
                maxLength={500}
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
					      icon={<ClusterOutlined />}
              >
                Create Broadcast list
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

export default CreateBroadCast;