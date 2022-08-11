import React, { useContext } from 'react';
import { AirBoxModelContext } from '../model/box_model';
import { observer } from 'mobx-react-lite';
import BoxCard from './BoxCard';

const BoxBoard = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);

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