import { Button, Form, Input, Select, message, DatePicker } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { BroadCastType } from "redux/types";
import { rules } from "validations/contact";
import { useEffect, useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import AlertWarning from "components/Dashboard/AlertWarning";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES, SCHEDULE_PREFIX_PATH } from "configs/AppConfig";
import UserService from "services/UserService";
import { CreateScheduleType } from "services/types/ScheduleServiceType";
import ScheduleService from "services/ScheduleService";

interface CreateScheduleProps {
  title: string
}
const CreateSchedule = ({ title }: CreateScheduleProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
	const [loadingContact, withContactLoading] = useLoading();
	const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
	const [broadCast, setBroadCast] = useState<BroadCastType[]>([]);

  const onCreate = async (values: any) => {
    const createSchedulePayload: CreateScheduleType = {
      name: values?.name,
      contact_group_id: values?.contact_group_id,
      scheduledDate: selectedDate,
    };

    try {
			await withContactLoading(ScheduleService.createSchedule(createSchedulePayload));
      form.resetFields();
			await messageApi.success('Broadcast list added successfully');
      navigate(SCHEDULE_PREFIX_PATH);
		} catch (error:any ) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const getBroadCasts = async () => {
		try {
			const broadcast = await withLoading(UserService.getUserContactGroups());
			setBroadCast(broadcast);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}
	
	useEffect(() => {
		getBroadCasts();
  }, []);

  const broadCastOptions = broadCast && broadCast.length > 0 ? (
    <>
      {broadCast.map((broadCast: BroadCastType) => (
        <Select.Option key={broadCast.id} value={broadCast.id}>{`${broadCast.name}`}</Select.Option>
      ))}
    </>
  ) : null;

  const handleDateSelected = (
    value: any,
    dateString: string,
  ) => {
    setSelectedDate(dateString);
  };

  return (
    <div className='p-5 chat-body-container'>
      <h4>Create a new schedule list</h4>
      {contextHolder}
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
              label="Schedule name"
              rules={rules.broadCastName}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter your schedule name"
                maxLength={100}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="contact_group_id"
              label="Broadcast Group"
              rules={rules.email}
              hasFeedback
              validateFirst={true}
            >
              <Select
                showSearch
                placeholder="Select broadcast"
                loading={loadingContact}
              >
                {broadCastOptions}
              </Select>
            </Form.Item>

            <Form.Item
              name="sendDate"
              label="When do you want this schedule to be sent to your contact group?"
              rules={rules.email}
              hasFeedback
              validateFirst={true}
            >
              <DatePicker onChange={handleDateSelected}  format="YYYY-MM-DDTHH:mm:ss+HH:mm"/>
            </Form.Item>

            {errorMessage &&
              <HandleErrors errors={errorMessage} />
            }
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Schedule list
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-5">
          <AlertInfo />
        </div>
      </div>
    </div>
  )
};

export default CreateSchedule;