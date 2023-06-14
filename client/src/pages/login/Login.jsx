import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';
import { RiAlertFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import './login.scss';

const Login = () => {

  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } = useContext(AuthContext);


  return (
    <div className='login'>
      <div className='login__container container'>
        <header>
          <h1 className='logo'>LOGO</h1>
        </header>

        <form className='login__form form__container' onSubmit={loginUser}>
          <h2>Log in your account</h2>

          <div className='login__form--name form'>
            <h3>Email<span>*</span></h3>

            <input type="email" placeholder='Enter your email'
              onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
            />

          </div>

          <div className='login__form--name form'>
            <h3>Password<span>*</span></h3>
            <input type="password" placeholder='Enter your password'
              onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
            />
          </div>

          <button className='form__button' type='submit'>
            {isLoginLoading ? <ClipLoader color='#F6F6F6'
              size={30} /> : 'Log in'}
          </button>

          {loginError ?
            <div className='form__error'>
              <div>
                <RiAlertFill className='icon' />
              </div>
              <p>{loginError.message}!</p>
            </div> :
            <p>Don't have an account?
              <Link to='/register'>
                <span> Sign Up</span>
              </Link>
            </p>
          }



        </form>
      </div>
    </div>
  )
}

export default Login