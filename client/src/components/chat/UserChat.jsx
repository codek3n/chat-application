import { IoPersonCircleSharp } from 'react-icons/io5';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import moment from 'moment';


const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat)

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    n => n.senderId == recipientUser?._id
  );


  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

  // console.log('recipientUser', recipientUser)

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + '...';
    }

    return shortText;
  };

  return (
    <div>
      <div className='contact-card__container' onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}>
        <div className='contact-card__profile-pic'>
          <IoPersonCircleSharp className='contact-card__profile-avatar' />

          {
            isOnline
              ? <span className='online--indicator'></span>
              : null
          }

        </div>
        <div className='card--name-preview'>

          <h3 className='contact-card__name'>
            {recipientUser?.name}
          </h3>

          {latestMessage?.text && <p>{truncateText(latestMessage?.text)}</p>}
        </div>

        <div className='card--time-notif'>
          {latestMessage?.createdAt && <p>{moment(latestMessage?.createdAt).calendar()}</p>}

          {thisUserNotifications?.length > 0
            ? <div className='contact-card__notif'>{thisUserNotifications?.length}</div>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default UserChat