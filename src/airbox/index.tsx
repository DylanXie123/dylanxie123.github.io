import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';
import Login from './components/Login';
import UpdatingIndicator from './components/UpdatingIndicator';
import CryptoJS from 'crypto-js';

function AppContent() {
  const airBoxModel = new AirBoxModel();

  useEffect(() => {
    return () => {
      airBoxModel.unSubscribe();
    };
  })

  return (
    <AirBoxModelContext.Provider value={airBoxModel}>
      <UpdatingIndicator />
      <BoxBoard />
    </AirBoxModelContext.Provider>
  );
}

function AirBoxApp() {
  const authenticate = () => {
    const key = localStorage.getItem('private key');
    if (!key || key.length === 0) {
      return false;
    } else {
      const cipher = 'U2FsdGVkX188/AO4D/R1RFTPjxyveU/Y+6jmDIbN4fYatwhuTXYU0yBUO5DwXVzx';
      const text = CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
      return text === 'Hello, React&App'
    }
  };

  if (authenticate()) {
    return <AppContent />
  } else {
    return <Login />
  }
}

export default AirBoxApp;
