import { Button, createStyles, makeStyles } from "@material-ui/core";
import { Backspace, Delete } from "@material-ui/icons";
import React, { MouseEventHandler, useContext } from "react";
import MathView from "react-math-view";
import { ControllerContext } from "../model/controller";

const kKeyWidth = 64;

const useStyles = makeStyles(() =>
  createStyles({
    keyboard: {
      position: "fixed",
      bottom: 0,
      width: '100%',
      zIndex: -1,
    },
    keyRow: {
      maxWidth: Math.min(kKeyWidth * 5, window.innerWidth),
      margin: 'auto',
      alignContent: 'center',
    },
    mathKey: {
      textTransform: 'lowercase',
      minWidth: 32,
      maxWidth: kKeyWidth,
      width: window.innerWidth / 5,
      boxSizing: 'border-box',
      height: 36,
      padding: 0,
    },
    keyContent: {
      outline: 0,
    },
  }),
);

export default function MathKeyboard() {
  const classes = useStyles();

  return (
    <div className={classes.keyboard}>
      <div>
        {ExtraKeyboard().map(
          (klist, index) => (
            <div className={classes.keyRow} key={index}>
              {klist.map(
                (k, index) => (
                  <MathKey
                    children={k.children}
                    onclick={k.onclick}
                    key={index}
                  />
                )
              )}
            </div>
          )
        )}
      </div>
      <div>
        {BasicKeyboard().map(
          (klist, index) => (
            <div className={classes.keyRow} key={index} >
              {klist.map(
                (k, index) => (
                  <MathKey
                    children={k.children}
                    onclick={k.onclick}
                    key={index}
                  />
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
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

  const row2: Array<MathKeyProp> = ['(', ')', 'e^{#?}', '{#?}^2'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row2.push({
    children: '\\sin^{-1}',
    onclick: () => controller.add('\\arcsin(')
  })
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
  const classes = useStyles();

  return (
    <Button
      variant='outlined'
      color="primary"
      onClick={prop.onclick}
      className={classes.mathKey}
    >
      {typeof prop.children === 'string' ?
        <MathView
          className={classes.keyContent}
          value={prop.children}
          readOnly={true}
        /> :
        prop.children}
    </Button>
  );
}