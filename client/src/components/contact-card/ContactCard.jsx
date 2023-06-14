import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import UserChat from '../chat/UserChat';
import { AuthContext } from '../../context/AuthContext';

import './contact-card.scss';

const ContactCard = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

  return (
    <>
      <h2 className='chat__aside--header'>Conversation</h2>
      {userChats?.length < 1 ? null :
        <div>
          <div className='contact-card'>
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })}
          </div>
        </div>
      }
    </>

  )
}

export default ContactCard