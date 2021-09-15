import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';
import UpdatingIndicator from './components/UpdatingIndicator';
import AddBoxCard from './components/AddBoxCard';

function AirBoxApp() {
  const airBoxModel = new AirBoxModel();

  useEffect(() => {
    airBoxModel.subscribe();
    return () => {
      airBoxModel.unSubscribe();
    };
  })

  return (
    <AirBoxModelContext.Provider value={airBoxModel}>
      <UpdatingIndicator />
      <BoxBoard />
      <AddBoxCard />
    </AirBoxModelContext.Provider>
  );
}

export default AirBoxApp;
