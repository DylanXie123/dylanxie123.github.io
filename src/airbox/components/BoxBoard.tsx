import React, { useContext } from 'react';
import { AirBoxModelContext } from '../model/box_model';
import { observer } from 'mobx-react-lite';
import BoxCard from './BoxCard';
import AddBoxCard from './AddBoxCard';

const BoxBoard = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);

  const grids = airBoxModel.boxes.map(box => (
    <li key={box.id}>
      <BoxCard box={box} />
    </li>
  ));

  grids.push(<AddBoxCard key='add'/>);

  return (
    <ul style={{padding: 10}}>
      {grids}
    </ul>
  );
})

export default BoxBoard