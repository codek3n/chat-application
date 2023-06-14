import { BsSendFill } from 'react-icons/bs';
import InputEmoji from 'react-input-emoji';
import { useContext, useState } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import './composer.scss';


const Composer = () => {
  const { user } = useContext(AuthContext)
  const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext)
  const [textMessage, setTextMessage] = useState('');

  const onSubmit = () => {
    sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
  }

  return (
    <div className='composer'>
      <div className='composer__container'>

        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily='Poppins'
          placeholder='Type a message...'
          borderColor='#35384030'
          fontSize={15}
          theme='dark'
          // cleanOnEnter={true}
          onEnter={onSubmit}
          maxLength={100}
        />

        <button onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
          <BsSendFill className='composer__icon--send' />
        </button>

      </div>


    </div>
  )
}

export default Composer