import Composer from '../composer/Composer';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import './conversation.scss';

const Conversation = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, notifications, onlineUsers } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const scroll = useRef();

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages]);

  if (!recipientUser) return (
    <p className='no-conversation'>
      Please select any one from your chat history.
    </p>
  )

  if (isMessagesLoading) return (
    <div className='loading__container'>
      <ClipLoader color='#64D686' size={50} />
    </div>
  )

  return (
    <>
      <div className='conversation'>
        <div className='conversation__container'>

          <header className='conversation__contact-info'>
            <div className='contact-info--profile-pic'>
              <IoPersonCircleSharp className='conversation__contact-info__profile-avatar' />

              {
                isOnline
                  ? <span className='online--indicator'></span>
                  : null
              }

            </div>

            <div className='contact-info--name-status'>
              <h3 className='contact-info__name'>
                {recipientUser?.name}
              </h3>

              <p className='contact-info__status'>
                {isOnline ? 'Active now' : 'Offline'}
              </p>
            </div>
          </header>

          <div className='conversation__history'>

            <div className='conversation__history__container'>

              {messages && messages.map((message, index) => {
                return (

                  <div className={`${message?.senderId === user?._id ? 'user--b' : 'user--a'}`} key={index}>
                    <div className='user--container'>

                      <div>
                        <IoPersonCircleSharp className={`${message?.senderId === user?._id ? 'hide' : 'user-pic user-profile--1'}`} />
                      </div>

                      <div className={`${message?.senderId === user?._id ? 'message-and-time you' : 'message-and-time recipient'}`}>
                        {/* <div className='chat__bubble' key={index} ref={scroll}> */}
                        <div className='chat__bubble' ref={scroll}>
                          {message?.text}
                        </div>
                        <span className='time-stamp'>{moment(message.createdAt).calendar()}</span>
                      </div>

                      <div>
                        <IoPersonCircleSharp className={`${message?.senderId === user?._id ? 'user-pic user-profile--2' : 'hide'}`} />
                      </div>

                    </div>
                  </div>
                )
              })}

            </div>

          </div>
        </div>

      </div>
      <Composer />
    </>
  )
}

export default Conversation