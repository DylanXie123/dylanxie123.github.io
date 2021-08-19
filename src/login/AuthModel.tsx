import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import CryptoJS from 'crypto-js';

export default class AuthModel {
  constructor() {
    makeObservable(this);
    this.initKey();
  }

  @action
  private initKey() {
    const key = localStorage.getItem('private key')
    if (key && key.length !== 0 && this.authenticate(key)) {
      this.logged = true;
    }
    return this.logged;
  }

  @observable private logged = false;

  @computed
  get isLogged() {
    return this.logged;
  }

  @action
  login = (key: string) => {
    if (this.authenticate(key)) {
      localStorage.setItem('private key', key);
      this.logged = true;
      return true;
    } else {
      return false;
    }
  }

  private authenticate = (key: string) => {
    const cipher = 'U2FsdGVkX188/AO4D/R1RFTPjxyveU/Y+6jmDIbN4fYatwhuTXYU0yBUO5DwXVzx';
    const text = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
    return text === 'Hello, React&App'
  };

  @action
  logout = () => {
    localStorage.removeItem('private key');
    this.logged = false;
  }
}

const authModel = new AuthModel();
export const AuthProvider = React.createContext(authModel);

