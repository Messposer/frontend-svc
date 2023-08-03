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

  const onCreate = async (values: CreateChatType) => {
    try {
			const chat = await withLoading(ChatService.createChat(values));
      saveFirstChat({ ...chat, contact_id: values.contact_id });
      navigate("/chats/continue-chat");
		} catch (error) {
			console.log(error);
		}
  }

  const getContacts = async () => {
		try {
			const contacts = await withContactLoading(UserService.getUserContacts());
			setContacts(contacts);
		} catch (error) {
			console.log(error);
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
                Continue
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
const mapDispatchToProps = {
	saveFirstChat,
};

export default connect(null, mapDispatchToProps)(CreateChat);