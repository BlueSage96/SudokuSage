import { useState, useRef, useEffect } from 'react';
import LogRegStyles from '../../css/LogReg.module.css';
import api from '../Axios.js';

export default function Login({ inputEnabled, enableInput, setDiv, setMessage, handleToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState(null);

  const loginButtonRef = useRef();
  const loginCancelRef = useRef();

  // 1. grab CSRF token on mount (and whenever we don't have one)
  useEffect(() => {
    if (csrfToken) return;

    async function fetchCsrf() {
      try {
        // Use the JSON CSRF endpoint - NOT /auth/login or /auth/register
        // backend responds with an HTML form string that includes the CSRF token
        const response = await api.get('/auth/csrf-token', {
          withCredentials: true //backend sends html, json
        });

        const token = response.data?.csrfToken;
        if (token) {
          setCsrfToken(token);
        } else {
          console.error('No csrfToken field in /auth/csrf-token response:', response.data);
        }
      } catch (err) {
        console.error('Failed to fetch CSRF token:', err);
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
      // 2. include _csrf when logging in
      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
          _csrf: csrfToken
        },
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

        // save token for authenticated routes
        handleToken(data.accessToken || data.token);

        // reset inputs + show games view
        setEmail('');
        setPassword('');
        setDiv('games');
      } else {
        setMessage(data.msg || 'An error has occurred');
      }
    } catch (err) {
      console.error('Login error:', {
        status: err.response?.status,
        data: err.response?.data
      });

      // this is where you were hitting 403 Forbidden
      setMessage(
        err.response?.data?.msg ||
          err.response?.data?.error ||
          (err.response?.status === 403 ? 'Login blocked: missing or invalid CSRF token' : 'Login failed')
      );
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
            <button
              type="button"
              className={LogRegStyles.LoginBtn}
              ref={loginButtonRef}
              onClick={showLogin}
              // disabled={!csrfToken} // don't let them submit before we have the CSRF
            >
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