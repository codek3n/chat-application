import { IoPersonCircleSharp } from 'react-icons/io5';
import './people-you-may-know.scss';
import { useContext } from 'react';
import { ChatContext } from '../../../context/ChatContext';
import { AuthContext } from '../../../context/AuthContext';

const PeopleYouMayKnow = () => {
  const { user } = useContext(AuthContext)
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  // console.log('PotentialChats', potentialChats);
  return (
    <div className='people-you-may-know'>
      <h2 className='chat__aside--header'>People you may know</h2>
      {potentialChats && potentialChats.map((u, index) => {
        return (
          <div className='contact-card__container'
            key={index} onClick={() => createChat(user._id, u._id)}>

            <div className='contact-card__profile-pic'>
              <IoPersonCircleSharp className='contact-card__profile-avatar' />

              {
                onlineUsers?.some((user) => user?.userId === u?._id)
                  ? <span className='online--indicator'></span>
                  : null
              }

            </div>
            <div className='card--name-preview'>
              <h3 className='contact-card__name'>
                {u.name}
              </h3>
            </div>
          </div>
        )
      })}

    </div>

  )
}

export default PeopleYouMayKnow;