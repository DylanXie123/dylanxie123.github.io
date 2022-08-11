import AES from 'crypto-js/aes';
import Utf8Encode from 'crypto-js/enc-utf8';

const authenticate = (key: string) => {
  const cipher = 'U2FsdGVkX19LkQydklw7F7RbgOdCBwXD1cfvQjLgfTYe+go46H+MPCsBFVBV1Q2w';
  const text = AES.decrypt(cipher, key).toString(Utf8Encode)
  return text === 'Hello, React&App'
};

export const haveKey = () => {
  const key = localStorage.getItem('private key')
  if (key && key.length !== 0 && authenticate(key)) {
    return true;
  } else {
    return false;
  }
}

export const setKey = (key: string) => {
  if (authenticate(key)) {
    localStorage.setItem('private key', key);
    return true;
  } else {
    return false;
  }
}

export const decrypt = (cipher: string | undefined) => {
  const key = localStorage.getItem('private key');
  if (!key || key.length === 0 || !cipher || cipher.length === 0) {
    throw Error(`decrypt ${cipher} failed`);
  } else {
    return AES.decrypt(cipher, key).toString(Utf8Encode)
  }
}
