import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Radio, Select, message } from "antd";
import { HandleErrors } from "services/error/handleErrors";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { ChatType, ScheduledType } from "redux/types";
import ScheduleService from "services/ScheduleService";
import { useLoading } from "hooks/useLoading";
import { ERROR_MESSAGES, SCHEDULE_PREFIX_PATH } from "configs/AppConfig";
import AlertInfo from "components/Dashboard/AlertInfo";
import { rules } from "validations/contact";
import TextEditor from "components/Editor";
import { AddTemplateToSchedulePayloadType, CreateMessageScheduleType } from "services/types/ScheduleServiceType";
import { CreateChatType } from "services/types/ChatServiceType";
import ChatService from "services/ChatService";
import { UserTemplateType } from "services/types/TemplateServiceType";
import TemplateService from "services/TemplateService";

interface ViewScheduleMessageModalProps {
  title: string,
  isOpen: boolean,
  onClose: () => void,
  scheduleId: string | null,
}

const AddScheduleMessageModal = ({title, isOpen = false, onClose, scheduleId}: ViewScheduleMessageModalProps) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [getChatLoading, withGetChatLoading] = useLoading();
  const [loadingSchedule, withScheduleLoading] = useLoading();
	const [schedule, setSchedule] = useState<ScheduledType>();
  const [makeAutoComplete, setMakeAutoComplete] = useState<string|null>(null);
	const [messageApi, contextHolder] = message.useMessage();
  const [chat, setChat] = useState<ChatType | null>(null);
  const [userSuggestion, setUserSuggestion] = useState<string|null>(null);
  const [useTemplate, setUseTemplate] = useState<boolean|null>(null);
  const [allUserTemplateLoading, withUserAllTemplateLoading] = useLoading();
  const [userTemplates, setUserTemplates] = useState<UserTemplateType[]>([]);
  const [userSelectedTemplate,setUserSelectedTemplate] = useState<number|null>(null); 
  const [form] = Form.useForm();
  const { TextArea } = Input;

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
      text: makeAutoComplete === 'yes' ? values?.autoText : values?.text,
      transporter: values?.transporter,
      scheduler_id: Number(scheduleId),
      autoGenerated: makeAutoComplete,
    }

    const addTemplateToSchedulePayload: AddTemplateToSchedulePayloadType = {
      templateId: userSelectedTemplate
    }

    if(useTemplate){
      try {
        await withScheduleLoading(ScheduleService.addTemplateToSchedule(scheduleId, addTemplateToSchedulePayload));
        form.resetFields();
        await messageApi.success('Message added schedule');
        window.location.href = `${SCHEDULE_PREFIX_PATH}`;
      } catch (error:any ) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }else{
      try {
        await withScheduleLoading(ScheduleService.createMessageSchedule(createScheduleMessagePayload));
        form.resetFields();
        await messageApi.success('Message added schedule');
        window.location.href = `${SCHEDULE_PREFIX_PATH}`;
      } catch (error:any ) {
        setErrorMessage(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : ERROR_MESSAGES.NETWORK_CONNECTIVITY
        );
      }
    }

  }

  const generateChat = async (values: CreateChatType) => {
    try {
			const chat = await withGetChatLoading(ChatService.createChat(values));
      setChat(chat);
		} catch (error: any) {
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
      getUserTemplates();
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

  const getUserTemplates = async () => {
    try {
			const templates = await withUserAllTemplateLoading(TemplateService.getAllUserTemplates());
			setUserTemplates(templates);
		} catch (error: any) {
			setErrorMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const handleUserSuggestion = (e: any) => {
    setUserSuggestion(e?.target?.value);
  }

  const handGetUserContentFromSuggestion = () => {
    if(userSuggestion){
      const getUserContent: CreateChatType = {
        message: userSuggestion || ""
      };
      generateChat(getUserContent);
    }
  }

  const handleUseTemplate = (e: any) => {
    setUseTemplate(e?.target?.value);
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
                name="transporter"
                label="How do you want to send this message"
                rules={rules.enterTransporter}
                hasFeedback
                validateFirst={true}
              >
                <Select
                  showSearch
                  placeholder="Select contact"
                >
                  <Select.Option key="EMAIL" value="EMAIL">EMAIL</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="useTemplate"
                label="Do you want to use a template for this schedule?"
                rules={rules.useTemplate}
                hasFeedback
                validateFirst={true}
                initialValue={null}
              >
                <Radio.Group 
                  name="radiogroup" 
                  onChange={(e) => handleUseTemplate(e)}
                >
                  <Radio value={true}>Yes, i want to use a template</Radio>
                  <Radio value={false}>No, i want a plain text</Radio>
                </Radio.Group>
              </Form.Item>
              {
                useTemplate === true ? (
                <>
                {
                  userTemplates.length > 0 &&
                  <div className="row">
                    {userTemplates.map((template: UserTemplateType) => (
                      <div className="col-md-3" key={template?.id}>
                        <h6>{template?.template?.title}</h6>
                        <Button 
                          role="button" 
                          type="primary"
                          disabled={userSelectedTemplate === template?.id}
                          onClick={() => setUserSelectedTemplate(template?.id ? template?.id : 0)}
                        >
                          {userSelectedTemplate === template?.id ? "Selected": "Select"}
                        </Button>
                      </div>
                    ))}
                  </div>
                }
                </>
                ) : (
                <>
                  {
                    useTemplate === false &&
                    <Form.Item
                      name="autoGenerate"
                      label="Do you want the AI to generate content for this schedule?"
                      rules={rules.autoGenerate}
                      hasFeedback
                      validateFirst={true}
                      initialValue={null}
                    >
                      <Radio.Group 
                        name="radiogroup" 
                        onChange={(e) => toggleAutoGenerate(e)}
                      >
                        <Radio value="yes">Yes, autogenerate the content for me</Radio>
                        <Radio value="no">No, i have my own content</Radio>
                      </Radio.Group>
                    </Form.Item>
                  }
    
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
    
                  {
                    makeAutoComplete === "yes" &&
                    <>
                      <Form.Item
                        name="message"
                        label="Describe what you want to send"
                        hasFeedback
                        rules={[{required: true, message: "Give a description of what you want to send"}]}
                        validateFirst={true}
                      >
                        <TextArea 
                          rows={4}
                          autoComplete="off"
                          onChange={handleUserSuggestion}
                          placeholder="Whats on your mind"
                          allowClear
                        />
                      </Form.Item>
                      <div className="mt-3">
                        <Button type="primary" onClick={handGetUserContentFromSuggestion} loading={getChatLoading}>Generate</Button>
                      </div>
                    </>
                  }
                  {
                    chat &&
                    <div className="mt-4">
                      <Form.Item
                        name="autoText"
                        label="Make changes to your content"
                        rules={[...rules.enterContent, { validator: validateContent } ]}
                        hasFeedback
                        validateFirst={true}
                        initialValue={chat?.chat_gpt_message}
                      >
                        <TextEditor placeholder="Enter your content"/>
                      </Form.Item>
                    </div>
                  }
                </>)
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
