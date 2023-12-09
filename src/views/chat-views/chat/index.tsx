import { useState, useEffect } from 'react';
import Chat from './chat';
import { connect } from "react-redux";
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { User } from 'redux/types/Auth';
import { RootState } from "redux/types/Root";
import { ChatType, ContactType, CurrentChatType, CreateChatMessageType } from 'redux/types';
import EmptyChat from './emptyChat';
import { useLoading } from 'hooks/useLoading';
import useWebSocket from 'hooks/useWebSocket';
import ChatLeftSide from './LeftSide';

interface ChatProps {
  title: string;
  authUser: User | null;
  token: string | null;
}

const ChatIndex = ({ title, authUser, token }: ChatProps) => {
  const [currentChat, setCurrentChat] = useState<CurrentChatType>();
  const socket = useWebSocket({ token, userId: authUser?.id });

  useDocumentTitle(title);

  useEffect(() => {
    if (authUser && socket) {
      socket.on('getMessages', (message: ChatType) => {
        console.log('Received message:', message);
      });

      return () => {
        socket.disconnect();
      };
    }

  }, [authUser, socket]);

  const handleChatSelection = (contact: ContactType) => {
    if(socket){
      socket.emit('getMessages', authUser?.id, contact?.id, (messages: ChatType[]) => {
        setCurrentChat({
          contact,
          messages,
        });
      });
    }
  };

  const handleSendMessage = (messageRequestPayload: CreateChatMessageType) => {
    if(socket){
      socket.emit('send-message', messageRequestPayload );
    }
  };

  return (
    <div className='p-3 chat-body-container'>
      {authUser && (
        <div className='chat-box-body-container bg-white'>
          <div className='row m-0'>
            <div className='col-md-3 p-0'>
              <ChatLeftSide currentChat={currentChat} handleChatSelection={handleChatSelection} />
            </div>
            <div className='col-md-9 p-0'>
              {currentChat ? 
                (
                  <Chat
                    currentChat={currentChat}
                    onSendMessage={handleSendMessage}
                    contact={currentChat?.contact}
                  />
                ): 
                (
                  <EmptyChat />
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({auth}: RootState) => {
  const { authUser, token } = auth;
  return { authUser,token };
};

export default connect(mapStateToProps)(ChatIndex);
