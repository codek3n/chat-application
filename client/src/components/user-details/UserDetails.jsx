import { IoPersonCircleSharp, IoLogOut } from 'react-icons/io5';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import './user-details.scss';

const UserDetails = () => {

  const { user, logoutUser } = useContext(AuthContext)

  return (
    <div className='user-details'>
      <div className='user-details__container'>

        <div className='user-details__login-as'>
          <div className='user-details--profile-pic'>
            <IoPersonCircleSharp className='user-details__contact-info__profile-avatar' />
          </div>

          <div className='user-details--name-status'>
            <h3 className='user-details__name'>
              {user.name}
            </h3>

            <p className='user-details__status'>
              {user.email}
              <div className='online--indicator'></div>
            </p>

          </div>
        </div>

        <div className='user-details--line-divider'></div>

        <div className='logout' onClick={logoutUser}>
          <IoLogOut className='sign-out--icon' />
          <p>Sign out</p>
        </div>

      </div>
    </div>
  )
}

export default UserDetails