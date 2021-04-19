import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import { ControllerContext } from '../model/controller';
import MathView from "react-math-view";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const useStyles = makeStyles(() =>
  createStyles({
    mathviewbox: {
      outline: '5px solid white',
      fontSize: 24,
      margin: 5,
      padding: 5,
      border: '2px dashed black',
      backgroundColor: 'white'
    },
  }),
);

export default function MathBox() {
  const exp = useContext(ExpContext);
  const controller = useContext(ControllerContext);
  const classes = useStyles();

  return (
    <MathView
      className={classes.mathviewbox}
      virtualKeyboardMode='off'
      onContentDidChange={
        mf => exp.update(mf.getValue("latex-expanded"))
      }
      ref={(mfe) => {
        if (mfe) {
          controller.setController(mfe);
        }
      }}
    />
  );
}