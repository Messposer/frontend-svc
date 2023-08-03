import { Button, Form, Input, Select } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatService from "services/ChatService";
import { rules } from "validations/contact";
import { RootState } from "redux/types/Root";
import { CreateMessageType } from "services/types/ChatServiceType";
import { useState } from "react";

interface CreateChatProps {
  title: string,
  newChat: any,
}
const { TextArea } = Input;
const CreateChat = ({ title, newChat }: CreateChatProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
  const navigate = useNavigate();

  const onCreate = async (values: CreateMessageType) => {
    try {
      const messagePayload = {
        contact_id: newChat?.contact_id,
        text: values?.text,
        chat_id: newChat?.id,
        transporter: values.transporter,
        subject: values.subject,
      }
			const chat = await withLoading(ChatService.createMessage(messagePayload));
      console.log(chat);
      navigate("/chats");
		} catch (error) {
			console.log(error);
		}
  }

  const [showSubject, setShowSubject] = useState<boolean>(false);

  const handleTransporterChange = (value: string) => {
    setShowSubject(value === 'EMAIL');
  };

  return (
    <div className='chat-body-container p-5'>
      <h4>Finish Chat</h4>
      <div className="row">
        <div className="col-md-7 bg-white p-3">
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            role="registerForm"
            onFinish={onCreate}
            initialValues={{ text: newChat?.chat_gpt_message }}
          >
            <Form.Item
              name="transporter"
              label="How do you want to send this message"
              rules={rules.email}
              hasFeedback
              validateFirst={true}
            >
              <Select
                showSearch
                placeholder="Select contact"
                onChange={handleTransporterChange}
              >
                <Select.Option key="EMAIL" value="EMAIL">EMAIL</Select.Option>
                <Select.Option key="WHATSAPP" value="WHATSAPP">WHATSAPP</Select.Option>
                <Select.Option key="SMS" value="SMS">SMS</Select.Option>
                <Select.Option key="TELEGRAM" value="TELEGRAM">TELEGRAM</Select.Option>

              </Select>
            </Form.Item>
            {showSubject && (
              <Form.Item
                name="subject"
                label="Message Submit"
                rules={rules.email}
                hasFeedback
                validateFirst={true}
              >
                <Input
                  autoComplete="off"
                  placeholder="Enter Subject"
                  maxLength={50}
                />
              </Form.Item>
            )}
            <Form.Item
              name="text"
              label="Describe what you want to send"
              hasFeedback
              validateFirst={true}
            >
              <TextArea 
                rows={4}
                autoComplete="off"
                placeholder="Whats on your mind"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="alert alert-info">
            This is an effort which was created in order to bridge the existing 
            gap between the theory taught in the classroom and practice science, 
            Agriculture, Medicine, Engineering, Technology and other professional 
            programs in the Nigerian tertiary institutions. This program is aimed at 
            exposing the students to the use of various machines and equipment, 
            professional work methods and ways of safe-guarding the work areas in 
            industries as well as other organizations and parastatals. 
          </div>
        </div>
      </div>
    </div>
  )
};
const mapStateToProps = ({chat}: RootState) => {
	const { newChat } = chat;
  return { newChat };
};

export default connect(mapStateToProps)(CreateChat);