import AES from 'crypto-js/aes';
import Utf8Encode from 'crypto-js/enc-utf8';

export const authenticate = (key: string) => {
  const cipher = 'U2FsdGVkX188/AO4D/R1RFTPjxyveU/Y+6jmDIbN4fYatwhuTXYU0yBUO5DwXVzx';
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
