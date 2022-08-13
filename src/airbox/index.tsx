import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/airboxModels';
import BoxBoard from './components/BoxBoard';
import InitialLoadingIndicator from './components/InitialLoadingIndicator';
import AddBoxCard from './components/AddBoxCard';

function AirBoxApp() {
  const airBoxModel = new AirBoxModel();

  useEffect(() => {
    airBoxModel.retrieve();
  })

  return (
    <AirBoxModelContext.Provider value={airBoxModel}>
      <InitialLoadingIndicator />
      <BoxBoard />
      <AddBoxCard />
    </AirBoxModelContext.Provider>
  );
}

export default AirBoxApp;
