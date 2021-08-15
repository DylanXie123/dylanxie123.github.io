import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';
import UpdatingIndicator from './components/UpdatingIndicator';

function AirBoxApp() {

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

export default AirBoxApp;
