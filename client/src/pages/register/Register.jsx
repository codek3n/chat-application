import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';
import { RiAlertFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './register.scss';

const Register = () => {

  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);

  return (
    <div className='register'>
      <div className='register__container container'>
        <header>
          <h1 className='logo'>LOGO</h1>
        </header>

        <form className='register__form form__container' onSubmit={registerUser}>
          <h2>Create your account</h2>

          <div className='register__form--name form'>
            <h3>Name<span>*</span></h3>
            <input type="text" placeholder='Enter your name'
              onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })}
            />
          </div>

          <div className='register__form--name form'>
            <h3>Email<span>*</span></h3>
            <input type="email" placeholder='Enter your email'
              onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
            />
          </div>

          <div className='register__form--name form'>
            <h3>Password<span>*</span></h3>
            <input type="password" placeholder='Enter your password'
              onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
            />
          </div>

          <button className='form__button' type='submit'>
            {isRegisterLoading ? <ClipLoader color='#F6F6F6'
              size={30} /> : 'Sign Up'}
          </button>

          {registerError ?
            <div className='form__error'>
              <div>
                <RiAlertFill className='icon' />
              </div>
              <p>{registerError.message}!</p>
            </div> :
            <p>Already have an account?
              <Link to='/login'>
                <span> Log in</span>
              </Link>
            </p>
          }

        </form>
      </div>
    </div>
  )
}

export default Register