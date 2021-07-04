import React, { useEffect } from 'react';
import { airBoxModel, AirBoxModelContext } from './model/box_model';
import BoxBoard from './components/BoxBoard';


function AirBoxApp() {

  useEffect(() => {
    return () => {
      airBoxModel.unSubscribe();
    };
  })

  return (
    <AirBoxModelContext.Provider value={airBoxModel}>
      <BoxBoard/>
    </AirBoxModelContext.Provider>
  );
}

export default AirBoxApp;
