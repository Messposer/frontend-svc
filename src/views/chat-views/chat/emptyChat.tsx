import { APP_NAME } from 'configs/AppConfig';

const EmptyChat = () => {
  return (
    <div className="center-div empty-chat-wrapper">
      <img src='/img/automation.png' height={500} alt={`${APP_NAME} empty chat`}/>
    </div>
  )
}

export default EmptyChat;