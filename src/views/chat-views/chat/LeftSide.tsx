import { useState, useEffect } from 'react';
import { ContactType, CurrentChatType } from 'redux/types';
import UserService from 'services/UserService';
import { useLoading } from 'hooks/useLoading';
import FilterInput from 'components/Input/filterInput';
import Loading from 'components/Loading';
import ContactCard from './contactCard';
import PerfectScrollbar from "react-perfect-scrollbar";
import 'react-perfect-scrollbar/dist/css/styles.css';

interface ChatProps {
  handleChatSelection: (contact: ContactType) => void;
  currentChat: CurrentChatType | undefined;
}

const ChatLeftSide = ({ handleChatSelection, currentChat }: ChatProps) => {
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const [loading, withLoading] = useLoading();
	const [filterValue, setFilterValue] = useState<string>('');
  const [leftBoxHeight, setLeftBoxHeight] = useState(0);

  const filteredContacts = contacts.filter((contact: ContactType) =>
    `${contact.first_name} ${contact.last_name} ${contact.email} ${contact.number} ${contact.avatar}`
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  ); 

  useEffect(() => {
    const getContacts = async () => {
      const contacts = await withLoading(UserService.getUserContacts());
      setContacts(contacts);
    }

    getContacts();
  }, []);

  useEffect(() => {
    const boxContainer = document.getElementById("chat-leftSide-container");
    const boxHeader = document.getElementById("chat-left-header");

    if(boxContainer && boxHeader){
      const totalBoxContainerHeight = boxContainer.offsetHeight + parseInt(getComputedStyle(boxContainer).marginTop);
      const totalBoxHeaderHeight = boxHeader.offsetHeight + parseInt(getComputedStyle(boxHeader).marginTop);
      setLeftBoxHeight(totalBoxContainerHeight - totalBoxHeaderHeight - 25);
    }

  }, [])

  return (
    <div className='chat-leftSide-container' id="chat-leftSide-container">
      <div className='chat-left-header' id='chat-left-header'>
        <h1 className="text-bold-sub-title">Chats</h1>
        <div className='contact-filter-container py-3'>
          <FilterInput 
            filterValue={filterValue} 
            setFilterValue={setFilterValue} 
            placeholder='Filter contacts'
            className="w-100 p-2"
          />
        </div>
      </div>
      <div className='chat-left-content' style={{ height: leftBoxHeight }}>
        <PerfectScrollbar>
          {
            !loading && filteredContacts.length > 0 ? (
              <ul>
                {filteredContacts.map((contact: ContactType) => (
                  <li 
                    key={contact.id} 
                    onClick={() => handleChatSelection(contact)}
                    className="contact-chat-list"
                  >
                    <ContactCard contact={contact} currentChat={currentChat}/>
                  </li>
                ))}
              </ul>
            ): (
              <div className="d-flex justify-content-center align-items-center">
                <h1 className="text-sub-title">No Contact found</h1>
              </div>
            )
          }
          {
            loading && <Loading cover="page"/>
          }
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default ChatLeftSide;
