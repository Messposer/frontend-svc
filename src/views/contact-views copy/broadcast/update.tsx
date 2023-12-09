import { Button, Form, Input, message } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BroadCastType } from "redux/types";
import ContactService from "services/ContactService";
import { rules } from "validations/contact";
import { useEffect, useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { CONTACT_GROUP_PREFIX_PATH, ERROR_MESSAGES } from "configs/AppConfig";
import { toast } from "sonner";
import { ClusterOutlined } from '@ant-design/icons';

interface UpdateBroadCastProps {
  title: string
}
const { TextArea } = Input;
const UpdateBroadCast = ({ title }: UpdateBroadCastProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(null);
  const [broadCast, setBroadCast] = useState<BroadCastType>();

  const onCreate = async (values: BroadCastType) => {
    try {
			await withLoading(ContactService.updateBroadCast(values, id));
      toast.success('Broadcast list updated successfully');
      navigate(`${CONTACT_GROUP_PREFIX_PATH}`);
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const getBroadCast = async () => {
    try {
			const broadCast = await withLoading(ContactService.getBroadCast(id));
      setBroadCast(broadCast);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  };

  useEffect(() => {
    getBroadCast();
  }, []);

  return (
    <div className='p-3 broadcast-body-container'>
      {!loading && 
        <>
          <div className="row">
            <div className="p-3 bg-white col-md-7">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-title">Update a broadcast list</h4>
                <Link to="..">
                  Back
                </Link>
              </div>
              <hr />
              <Form
                form={form}
                layout="vertical"
                name="create-broadcast-form"
                onFinish={onCreate}
                initialValues={broadCast}
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
                    Update Broadcast list
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="col-md-5">
              <AlertInfo />
              <AlertWarning />
            </div>
          </div>
        </>
      }
    </div>
  )
};

export default UpdateBroadCast;