import React, { useContext } from 'react';
import { AirBoxModelContext } from '../model/box_model';
import { observer } from 'mobx-react-lite';
import BoxCard from './BoxCard';
import AddBoxCard from './AddBoxCard';
import GridList from '@material-ui/core/GridList/GridList';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { GridListTile } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      padding: 10,
    },
  }),
);

const BoxBoard = observer(() => {
  const airBoxModel = useContext(AirBoxModelContext);
  const classes = useStyles();

  const grids = airBoxModel.boxes.map(box => (
    <GridListTile key={box.id}>
      <BoxCard box={box} />
    </GridListTile>
  ));

  grids.push(<AddBoxCard key='add'/>);

  return (
    <GridList className={classes.grid} cols={5}>
      {grids}
    </GridList>
  );
})

export default BoxBoard