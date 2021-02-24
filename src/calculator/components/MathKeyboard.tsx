import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Backspace, Delete } from "@material-ui/icons";
import React, { MouseEventHandler, useContext } from "react";
import MathView from "react-math-view";
import { ControllerContext } from "../model/controller";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      position: "fixed",
      bottom: 0,
    },
  }),
);

export default function MathKeyboard() {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} container justify={'center'}>
      <Grid container item justify={'center'} xs={8} >
        {ExtraKeyboard().map(
          (klist, index) => (
            <Grid container item key={index} justify={'center'} >
              {klist.map(
                (k, index) => (
                  <Grid item key={index} xs={2}>
                    <MathKey children={k.children} onclick={k.onclick} />
                  </Grid>
                )
              )}
            </Grid>
          )
        )}
      </Grid>
      <Grid container item justify={'center'} xs={8}>
        {BasicKeyboard().map(
          (klist, index) => (
            <Grid container item key={index} justify={'center'} >
              {klist.map(
                (k, index) => (
                  <Grid item key={index} xs={2}>
                    <MathKey children={k.children} onclick={k.onclick} />
                  </Grid>
                )
              )}
            </Grid>
          )
        )}
      </Grid>
    </Grid>
  );
}

function ExtraKeyboard(): MathKeyProp[][] {
  const controller = useContext(ControllerContext);

  const row1: Array<MathKeyProp> = ['\\sin', '\\cos', '\\tan', '\\log'].map((v) => ({
    children: v,
    onclick: () => controller.add(v + '(#?)')
  }));

  row1.push({
    children: '\\sqrt{#?}',
    onclick: () => controller.add('\\sqrt{#?}')
  })

  row1.push({
    children: '\\sin^{-1}',
    onclick: () => controller.add('\\arcsin(')
  })

  const row2: Array<MathKeyProp> = ['(', ')', 'e^{#?}', '{#?}^2'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  return [row1, row2];
}

function BasicKeyboard(): MathKeyProp[][] {
  const controller = useContext(ControllerContext);

  const row1: Array<MathKeyProp> = ['7', '8', '9'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row1.push({
    children: <Delete />,
    onclick: () => controller.clear()
  })

  row1.push({
    children: <Backspace />,
    onclick: () => controller.backspace()
  })

  const row2: Array<MathKeyProp> = ['4', '5', '6', '+', '-'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  const row3: Array<MathKeyProp> = ['1', '2', '3'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row3.push({
    children: '\\times',
    onclick: () => controller.add('*')
  })

  row3.push({
    children: '\\div',
    onclick: () => controller.add('/')
  })

  const row4: Array<MathKeyProp> = ['0', '.', '\\pi', 'e'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row4.push({
    children: '=',
    onclick: () => controller.add('/')
  })

  return [row1, row2, row3, row4];
}

interface MathKeyProp {
  onclick: MouseEventHandler
  children?: string | JSX.Element
}

function MathKey(prop: MathKeyProp) {
  return (
    <Button
      variant='outlined'
      color="primary"
      onClick={prop.onclick}
      style={{ textTransform: 'lowercase' }}
    >
      {typeof prop.children === 'string' ?
        <MathView
          value={prop.children}
          readOnly={true}
          style={{ outline: 0, height: '24px', fontSize: '1em', position: 'relative', bottom: '7px' }}
        /> :
        prop.children}
    </Button>
  );
}