import { Button, Form, Input, Select, message, DatePicker, Radio } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { useNavigate, Link } from "react-router-dom";
import { BroadCastType } from "redux/types";
import { rules } from "validations/contact";
import { useEffect, useState } from "react";
import AlertInfo from "components/Dashboard/AlertInfo";
import { HandleErrors } from "services/error/handleErrors";
import { ERROR_MESSAGES, SCHEDULE_PREFIX_PATH } from "configs/AppConfig";
import UserService from "services/UserService";
import { CreateScheduleType } from "services/types/ScheduleServiceType";
import ScheduleService from "services/ScheduleService";
import { Now } from "configs/dateFormat";
import moment from "moment";
import { ScheduleOutlined } from '@ant-design/icons';

interface CreateScheduleProps {
  title: string,
	onOpenModal: (id: string, type: string) => void,
}
const CreateSchedule = ({ title, onOpenModal }: CreateScheduleProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
	const [loadingContact, withContactLoading] = useLoading();
	const [messageApi, contextHolder] = message.useMessage();
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
	const [broadCast, setBroadCast] = useState<BroadCastType[]>([]);
  const [schedulePost, setSchedulePost] = useState<boolean>(false);

  const toggleSchedulePost = (e: any) => setSchedulePost(e?.target?.value);

  const onCreate = async (values: any) => {
    const createSchedulePayload: CreateScheduleType = {
      name: values?.name,
      subject: values?.subject,
      contact_group_id: values?.contact_group_id,
      scheduledDate: schedulePost ? selectedDate : moment().format(Now),
    };

    try {
			const schedule = await withContactLoading(ScheduleService.createSchedule(createSchedulePayload));
      form.resetFields();
			messageApi.success('Broadcast list added successfully');
      onOpenModal(String(schedule?.id), "add")
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
    <div className='p-3 chat-body-container'>
      {contextHolder}
      <div className="row">
        <div className="p-3 bg-white col-md-7">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-title">Create a new schedule list</h4>
            <Link to="../">
              Back
            </Link>
          </div>
          <h5 className="text-sub-title pt-1 mb-3">Provide your email and password to continue</h5>
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
              name="subject"
              label="Add a Subject"
              rules={rules.enterSubject}
              hasFeedback
              validateFirst={true}
            >
              <Input
                autoComplete="off"
                placeholder="Enter a subject"
                maxLength={100}
                className="custom-input"
              />
            </Form.Item>

            <Form.Item
              name="contact_group_id"
              label="Broadcast Group"
              rules={rules.chooseBroadCastGroup}
              hasFeedback
              validateFirst={true}
            >
              <Select
                showSearch
                placeholder="Select broadcast"
                loading={loadingContact}
                className="custom-select"
              >
                {broadCastOptions}
              </Select>
            </Form.Item>

            <Form.Item
                name="autoGenerate"
                label="Do you want the AI to generate content for this schedule?"
                rules={rules.autoGenerate}
                hasFeedback
                validateFirst={true}
                initialValue={false}
              >
                <Radio.Group 
                  name="radiogroup" 
                  onChange={(e) => toggleSchedulePost(e)}
                  value={false}
                  className="custom-radio"
                >
                  <Radio 
                    value={false}
                    className="custom-radio-option"
                  >
                    Send Immediately
                  </Radio>
                  <Radio 
                    value={true}
                    className="custom-radio-option"
                  >
                    I want to add a send date
                  </Radio>
                </Radio.Group>
              </Form.Item>

            {
              schedulePost === true &&
              <Form.Item
                name="sendDate"
                label="When do you want this schedule to be sent to your contact group?"
                rules={rules.email}
                hasFeedback
                validateFirst={true}
              >
                <DatePicker 
                  onChange={handleDateSelected}  
                  format={Now}
                  className="custom-input"
                />
              </Form.Item>
            }

            {errorMessage &&
              <HandleErrors errors={errorMessage} />
            }
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
					      size="large"
                loading={loadingContact}
                className="custom-button custom-button-lg custom-primary-button"
                icon={<ScheduleOutlined />}  
              >
                Create Schedule list
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-5 p-0 ps-3">
          <AlertInfo />
        </div>
      </div>
    </div>
  )
};

export default CreateSchedule;