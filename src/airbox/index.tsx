import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';
import Login from './components/Login';
import UpdatingIndicator from './components/UpdatingIndicator';

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
  const authenticate = () => localStorage.getItem('private key') ? true : false;

  if (authenticate()) {
    return <AppContent />
  } else {
    return <Login />
  }
}

export default AirBoxApp;
