import { useState, useEffect, useRef} from 'react';
import LogRegStyles from '../../css/LogReg.module.css';
import api from '../Axios.js';

export default function Login({ inputEnabled, enableInput, setDiv, setMessage, handleToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState(null);

  const loginButtonRef = useRef();
  const loginCancelRef = useRef();

  // grab CSRF token on mount (and whenever we don't have one)
 useEffect(() => {
   if (csrfToken) return;

   async function fetchCsrf() {
     try {
       // This becomes: http://localhost:3000/api/v1/sudoku/auth/csrf-token
       const response = await api.get('/auth/csrf-token', {
         withCredentials: true // api already has this, but harmless here
       });

       const token = response.data?.csrfToken;
       if (token) {
         setCsrfToken(token);
       } else {
         console.error('No csrfToken field in /auth/csrf-token response:', response.data);
       }
     } catch (err) {
       console.error('Failed to fetch CSRF token:', err);
       // if you want, you can surface this to the UI:
       // setMessage("Could not contact server for CSRF token");
     }
   }

   fetchCsrf();
 }, [csrfToken]);

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  async function handleLogin() {
    if (!inputEnabled) return;
    enableInput(false);

    try {
      // include csrf when logging in
      const response = await api.post('/auth/login',{ email, password, _csrf: csrfToken },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setMessage(`Login successful. Welcome ${data.user.name}!`);

        handleToken(data.accessToken || data.token);
        setEmail('');
        setPassword('');
        setDiv('games');
      } else {
        setMessage(data.msg || 'An error has occurred');
      }
    } catch (err) {
      //defensive reads (optional chaining/fallback)
      console.error('Login error:', {
        status: err.response?.status,
        data: err.response?.data
      });
      setMessage(err.response?.data?.msg || err.response?.data?.error || 
        (err.response?.status === 403 ? 'Login blocked: missing or invalid CSRF token': 'Login failed'));
    }
    enableInput(true);
  }

  function handleCancel() {
    setEmail('');
    setPassword('');
    if (setDiv) {
      setDiv('default');
    }
  }

  function showLogin() {
    handleLogin();
  }
  return (
    <>
      <div className={LogRegStyles.LoginDiv}>
        {/* onSubmit for handleLogin e.preventDefault */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <div>
            {' '}
            <label htmlFor="email" className={LogRegStyles.EmailTxt}>
              Email:
            </label>{' '}
            <input type="email" className={LogRegStyles.Email} value={email} onChange={handleEmail} />{' '}
          </div>
          <div>
            {' '}
            <label htmlFor="password" className={LogRegStyles.PwdTxt}>
              Password:
            </label>{' '}
            <input type="password" className={LogRegStyles.Pwd1} value={password} onChange={handlePassword} />{' '}
          </div>{' '}
          <div style={{ display: 'flex' }}>
            {/* Don't submit until user has CSRF token */}
            <button type="button" className={LogRegStyles.LoginBtn} ref={loginButtonRef} 
            onClick={showLogin}>
              Login
            </button>{' '}
            <button type="button" className={LogRegStyles.LoginCancel} ref={loginCancelRef} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
