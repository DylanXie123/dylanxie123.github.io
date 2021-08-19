import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { haveKey, setKey } from './auth';

const Login = () => {
  const [key, update] = useState('');
  const history = useHistory();
  const location = useLocation<string>();

  const from = location.state || "/";

  if (haveKey()) {
    return <Redirect to={from} />
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const succeed = setKey(key);
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
