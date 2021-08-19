import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthProvider } from './AuthModel'

const Login = () => {
  const [key, update] = useState('');
  const history = useHistory();
  const location = useLocation<string>();
  const auth = useContext(AuthProvider);

  const from = location.state || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const succeed = auth.login(key);
    if (succeed) {
      history.replace(from);
    } else {
      update('');
      alert('Invalid Key');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='password' placeholder={'Enter password'} autoComplete={'current-password'} required value={key} onChange={e => update(e.target.value)} />
        <input type='submit' />
      </form>
    </div>
  )
}

export default Login;
