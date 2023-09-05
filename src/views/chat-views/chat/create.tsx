import { Button, Form, Input, Select } from "antd";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useLoading } from "hooks/useLoading";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatService from "services/ChatService";
import { CreateChatType } from "services/types/ChatServiceType";
import { rules } from "validations/contact";
import { saveFirstChat } from "redux/actions";
import UserService from "services/UserService";
import { useEffect, useState } from "react";
import { ContactType } from "redux/types";
import AlertInfo from "components/Dashboard/AlertInfo";
import { ERROR_MESSAGES } from "configs/AppConfig";
import { HandleErrors } from "services/error/handleErrors";

interface CreateChatProps {
  title: string,
  saveFirstChat: any
}
const { TextArea } = Input;
const CreateChat = ({ title, saveFirstChat }: CreateChatProps) => {
  useDocumentTitle(title);
  const [form] = Form.useForm();
	const [loading, withLoading] = useLoading();
	const [contactLoading, withContactLoading] = useLoading();
	const [contacts, setContacts] = useState<ContactType[]>([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  const onCreate = async (values: CreateChatType) => {
    try {
			const chat = await withLoading(ChatService.createChat(values));
      saveFirstChat({ ...chat, contact_id: values.contact_id });
      navigate("/chats/continue-chat");
		} catch (error: any) {
			setMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
  }

  const getContacts = async () => {
		try {
			const contacts = await withContactLoading(UserService.getUserContacts());
			setContacts(contacts);
		} catch (error: any) {
			setMessage(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : ERROR_MESSAGES.NETWORK_CONNECTIVITY
      );
		}
	}

  useEffect(() => {
    getContacts();
  }, []);

  const options = contacts && contacts.length > 0 ? (
    <>
      {contacts.map((contact: ContactType) => (
        <Select.Option key={contact.id} value={contact.id}>{`${contact.first_name} ${contact.last_name}`}</Select.Option>
      ))}
    </>
  ) : null;

  return (
    <div className='chat-body-container p-5'>
      <h4>Create a new chat</h4>
      <div className="row">
        <div className="col-md-7 bg-white p-3">
          <Form
            form={form}
            layout="vertical"
            name="register-form"
            role="registerForm"
            onFinish={onCreate}
          >
            <Form.Item
              name="contact_id"
              label="Contact"
              rules={rules.email}
              hasFeedback
              validateFirst={true}
            >
              <Select
                showSearch
                placeholder="Select contact"
                loading={contactLoading}
              >
                {options}
              </Select>
            </Form.Item>

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
                placeholder="Whats on your mind"
              />
            </Form.Item>
            {message &&
              <HandleErrors errors={message} />
            }
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {loading ? "Generating content" : "Continue"}
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
const mapDispatchToProps = {
	saveFirstChat,
};

export default connect(null, mapDispatchToProps)(CreateChat);