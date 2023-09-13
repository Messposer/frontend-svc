import { useEffect, useState } from "react";
import { Button, Form, Modal, Radio, message } from "antd";
import { HandleErrors } from "services/error/handleErrors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { ScheduledType } from "redux/types";
import ScheduleService from "services/ScheduleService";
import { useLoading } from "hooks/useLoading";
import { ERROR_MESSAGES, SCHEDULE_PREFIX_PATH } from "configs/AppConfig";
import AlertInfo from "components/Dashboard/AlertInfo";
import { rules } from "validations/contact";
import TextEditor from "components/Editor";
import { CreateMessageScheduleType } from "services/types/ScheduleServiceType";
import { useNavigate } from "react-router-dom";

interface ViewScheduleMessageModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  scheduleId: string | null,
}

const AddScheduleMessageModal = ({title, isOpen = false, onClose, scheduleId}: ViewScheduleMessageModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [loadingSchedule, withScheduleLoading] = useLoading();
	const [schedule, setSchedule] = useState<ScheduledType>();
  const [makeAutoComplete, setMakeAutoComplete] = useState<string|null>(null);
	const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useDocumentTitle(title);

  const getSchedule = async () => {
		try {
			const _schedule = await withLoading(ScheduleService.getSchedule(scheduleId));
			setSchedule(_schedule);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  const onCreate = async (values: any) => {
    const createScheduleMessagePayload: CreateMessageScheduleType = {
      text: values?.text,
      transporter: "EMAIL",
      scheduler_id: Number(scheduleId),
      autoGenerated: makeAutoComplete,
    }

    try {
			await withScheduleLoading(ScheduleService.createMessageSchedule(createScheduleMessagePayload));
      form.resetFields();
			await messageApi.success('Message added schedule');
      navigate(SCHEDULE_PREFIX_PATH);
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const toggleAutoGenerate = (e: any) => setMakeAutoComplete(e?.target?.value);
  
	useEffect(() => {
    if(scheduleId){
      getSchedule();
    }
    return () => {
      setMakeAutoComplete(null);
    }
  }, [scheduleId]);

  const validateContent = (_: any, value: string) => {
    if (value === '<p><br></p>') {
        return Promise.reject("Content is required");
    }
    return Promise.resolve();
  };

  const closeModal = () => {
    setMakeAutoComplete(null);
    onClose();
  }

  return (
    <Modal
      width={1200}
      open={isOpen}
      onCancel={closeModal}
      footer={null}
    >
      <div className='add-schedule-message-container'>
        <h4>Create Message to {schedule?.name}</h4>
        {contextHolder}
        <div className="row">
          <div className="p-3 bg-white col-md-9">
            <Form
              form={form}
              layout="vertical"
              name="create-schedule-message-form"
              onFinish={onCreate}
            >

              <Form.Item
                name="autoGenerate"
                label="Do you want the AI to generate content for this schedule?"
                rules={rules.autoGenerate}
                hasFeedback
                validateFirst={true}
                initialValue={""}
              >
                <Radio.Group 
                  name="radiogroup" 
                  onChange={(e) => toggleAutoGenerate(e)}
                >
                  <Radio value="yes">Yes, autogenerate the content for me</Radio>
                  <Radio value="no">No, i have my own content</Radio>
                </Radio.Group>
              </Form.Item>

              {
                makeAutoComplete === "no" &&
                <Form.Item
                  name="text"
                  label="Type your content"
                  rules={[...rules.enterContent, { validator: validateContent } ]}
                  hasFeedback
                  validateFirst={true}
                  initialValue={""}
                >
                  <TextEditor placeholder="Enter your content"/>
                </Form.Item>
              }

              {errorMessage &&
                <HandleErrors errors={errorMessage} />
              }
              <Form.Item>
                <Button type="primary" className="mt-3" htmlType="submit" loading={loadingSchedule}>
                  Create Message
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="col-md-3">
            <AlertInfo />
          </div>
        </div>
      </div>
    </Modal>
  )
};

export default AddScheduleMessageModal;