import React, { useContext } from 'react';
import { AirBoxModelContext } from '../model/box_model';
import { observer } from 'mobx-react-lite';
import BoxCard from './BoxCard';
import AddBoxCard from './AddBoxCard';

const BoxBoard = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);

  const boxes = airBoxModel.boxes.map(box => (
    <BoxCard key={box.id} box={box} />
  ));

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
        {boxes}
      </div>
      <AddBoxCard />
    </>
  );
})

export default BoxBoard