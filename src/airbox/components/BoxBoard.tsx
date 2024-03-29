import React from 'react';
import { useAirBoxModel } from '../model/airboxModels';
import { observer } from 'mobx-react-lite';
import BoxCard from './BoxCard';

const BoxBoard = observer(() => {
  const airBoxModel = useAirBoxModel();

  const boxes = airBoxModel.getModels.map(box => (
    <BoxCard key={box.id} box={box} />
  ));

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginBlock: '10px',
    maxWidth: '900px',
  };

  return (
    <div style={style}>
      {boxes}
      <div style={{ height: '50px' }} />
    </div>
  );
})

export default BoxBoard