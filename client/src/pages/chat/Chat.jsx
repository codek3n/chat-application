import { TbMessageCircle } from 'react-icons/tb';
import { IoLogOut } from 'react-icons/io5';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { BsPersonFillAdd } from 'react-icons/bs';
import ContactCard from '../../components/contact-card/ContactCard';
import Conversation from '../../components/conversation/Conversation';
import PeopleYouMayKnow from '../../components/chat/people-you-may-know/PeopleYouMayKnow';
import UserDetails from '../../components/user-details/UserDetails';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import './chat.scss';

const Chat = () => {
  const [isToggled, setIsToggled] = useState(false);
  const { logoutUser } = useContext(AuthContext);
  const { notifications, allUsers } = useContext(ChatContext);
  const [showChatTab, setShowChatTab] = useState(true);

  const unreadNotifications = unreadNotificationsFunc(notifications);

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  return (
    <div className='chat'>
      <div className='chat__container'>
        <nav>
          <IoPersonCircleSharp className='profile-avatar'
            onClick={handleToggle} />

          <div onClick={() => setShowChatTab(true)}>
            <TbMessageCircle className={showChatTab ? 'icon active' : 'icon'} />
            {unreadNotifications?.length === 0 ? null :
              <span className='chat-notification'>
                {unreadNotifications?.length}
              </span>
            }
          </div>

          <div onClick={() => setShowChatTab(false)}>
            <BsPersonFillAdd className={!showChatTab ? 'icon active' : 'icon'} />
          </div>

          <div className='logout' onClick={logoutUser}>
            <IoLogOut className='icon' />
          </div>
        </nav>

        {isToggled ? <UserDetails /> : null}

        <aside>
          <div className='aside__container'>
            <h1 className='logo'>LOGO</h1>
            <div className='line-divider'></div>
            {showChatTab ? <ContactCard /> : <PeopleYouMayKnow />}
          </div>
        </aside>

        <div className='chat__conversation'>
          <Conversation />
        </div>
      </div>
    </div>
  )
}

export default Chat