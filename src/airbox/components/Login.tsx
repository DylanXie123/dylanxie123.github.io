import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [content, update] = useState('');
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('private key', content)
    history.push("/airbox");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='password' placeholder={'Enter password'} autoComplete={'current-password'} required value={content} onChange={e => update(e.target.value)} />
        <input type='submit' />
      </form>
    </div>
  )
}

export default Login;
