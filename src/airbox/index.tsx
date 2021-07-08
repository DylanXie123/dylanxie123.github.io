import React, { useEffect } from 'react';
import AirBoxModel, { AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';


function AirBoxApp() {

  const airBoxModel = new AirBoxModel();

  useEffect(() => {
    airBoxModel.subscribe();
    return () => {
      airBoxModel.unSubscribe();
      console.log('Here');
    };
  })

  return (
    <AirBoxModelContext.Provider value={airBoxModel}>
      <BoxBoard/>
    </AirBoxModelContext.Provider>
  );
}

export default AirBoxApp;
