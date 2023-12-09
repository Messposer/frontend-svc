import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { ChatType, ContactType, CurrentChatType, CreateChatMessageType } from 'redux/types';
import ContactCard from './contactCard';
import MessageText from './messageText';
import PerfectScrollbar from "react-perfect-scrollbar";
import 'react-perfect-scrollbar/dist/css/styles.css';

interface ChatProps {
  onSendMessage: (messageRequestPayload: CreateChatMessageType) => void; 
  contact: ContactType;
  currentChat: CurrentChatType | undefined;
}
const Chat = ({ currentChat, onSendMessage, contact }: ChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatBoxHeight, setChatBoxHeight] = useState(0);
  const [chatBoxTextHeight, setChatBoxTextHeight] = useState(0);
  const chatBodyTextWrapperRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    onSendMessage({ text: newMessage, receiverId: contact?.id });
    setNewMessage('');
  };

  useEffect(() => {
    const chatHeader = document.getElementById("main-chat-header");
    const chatBox = document.getElementById("chat-body-wrapper");
    const chatInputBox = document.getElementById("chat-input-wrapper");
    
    if(chatBox && chatHeader){
      const totalChatHeaderHeight = chatHeader.offsetHeight + parseInt(getComputedStyle(chatHeader).marginTop);
      const totalChatBoxHeight = chatBox.offsetHeight + parseInt(getComputedStyle(chatBox).marginTop);
      setChatBoxHeight(totalChatBoxHeight - totalChatHeaderHeight);
      if(chatInputBox && chatBoxHeight > 0){
        const totalChatInputBoxHeight = chatInputBox.offsetHeight + parseInt(getComputedStyle(chatInputBox).marginTop);
        setChatBoxTextHeight(chatBoxHeight - totalChatInputBoxHeight);
      }
    }

  }, [chatBoxHeight])

  useEffect(() => {
    const chatBodyTextWrapper = chatBodyTextWrapperRef.current;
    const scrollToBottom = () => {
      if (chatBodyTextWrapper) {
        chatBodyTextWrapper.scrollTo({
          top: chatBodyTextWrapper.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
    setTimeout(scrollToBottom, 100);

  }, [currentChat]);

  return (
    <div className="empty-chat-wrapper chat-body-wrapper" id="chat-body-wrapper">
      <ContactCard contact={contact} currentChat={currentChat} isMain={true}/>
      <div className="chat-body-text-container" style={{ height: chatBoxHeight }}>
        <div 
          className="chat-body-text-wrapper py-3 px-4" 
          style={{ height: chatBoxTextHeight }}
          ref={chatBodyTextWrapperRef}
        >
          {/* <PerfectScrollbar> */}
          {currentChat?.messages && currentChat?.messages.length > 0 ? (
            currentChat?.messages.map((message: ChatType) => (
              <MessageText key={message.id} message={message} />
            ))
          ) : (
            <div className="center-div" style={{ height: chatBoxTextHeight - 50 }}>
              <h4 className="text-bold-sub-title text-center">No Conversation with this contact, start by sending a message to <br /> their instagram or whatsapp</h4>
            </div>
          )}
          {/* </PerfectScrollbar> */}
        </div>
        <div className="chat-input-wrapper" id="chat-input-wrapper">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          {/* Button to send a new message */}
          <Button 
            type="primary" 
            onClick={handleSendMessage}
            className="custom-button custom-button-sm custom-secondary-button"
          > 
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
