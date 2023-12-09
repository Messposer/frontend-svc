import { ContactAvatar } from 'components/AvatarStatus';
import { ContactType, CurrentChatType } from 'redux/types';

interface ContactCardProps {
  contact: ContactType;
  currentChat: CurrentChatType | undefined;
  isMain?: boolean;
}

const ContactCard = ({ contact, currentChat, isMain = false }: ContactCardProps) => {
  return (
    <div 
      className={`d-flex 
      ${!isMain && contact?.id === currentChat?.contact?.id ? "active" : ""}
      ${isMain ? "main-chat-wrapper py-2 px-4" : "contact-chat-wrapper"}`}
      id={isMain ? "main-chat-header": ""}
      >
      <div className="flex-shrink-0">
        <ContactAvatar size={50} contact={contact} />
      </div>
      <div className="flex-grow-1 ms-2 user-info mt-1">
        <div className="my-0 contact-chat-user-name">
          {`${contact?.first_name} ${contact?.last_name}`}
        </div>
        <p className="my-0 contact-chat-user-email">
          {`${contact?.email}`}
        </p>
      </div>
    </div>
  )
};

export default ContactCard;