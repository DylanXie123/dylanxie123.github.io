import { Button } from "@material-ui/core";
import { Backspace, Delete } from "@material-ui/icons";
import React, { MouseEventHandler, useContext } from "react";
import MathView from "react-math-view";
import { ControllerContext } from "../model/controller";

const kKeyWidth = 64;
const kKeyHeight = 36;

export default function MathKeyboard() {

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: -1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, ${kKeyWidth}px)`, justifyContent: 'center' }}>
        {ExtraKeyboard().map(
          (key, index) => (
            <div key={index}>
              <MathKey
                children={key.children}
                onclick={key.onclick}
                key={index}
              />
            </div>
          )
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, ${kKeyWidth}px)`, justifyContent: 'center' }}>
        {BasicKeyboard().map(
          (key, index) => (
            <div key={index} >
              <MathKey
                children={key.children}
                onclick={key.onclick}
                key={index}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function ExtraKeyboard(): MathKeyProp[] {
  const controller = useContext(ControllerContext);

  const row1: Array<MathKeyProp> = ['\\sin', '\\cos', '\\tan', '\\log', '\\sqrt'].map((v) => ({
    children: v,
    onclick: () => {
      controller.add(v + '({#?})');
    }
  }));

  const row2Trig: Array<Record<"children" | "command", string>> = [
    {
      children: '\\sin^{-1}',
      command: '\\arcsin({#?})'
    },
    {
      children: '\\cos^{-1}',
      command: '\\arccos({#?})'
    },
    {
      children: '\\tan^{-1}',
      command: '\\arctan({#?})'
    },
    {
      children: 'e^{#?}',
      command: 'e^{#?}'
    },
    {
      children: '{#?}^2',
      command: '{#?}^2'
    },
  ];

  const row2: Array<MathKeyProp> = row2Trig.map((v) => ({
    children: v.children,
    onclick: () => controller.add(v.command)
  }));

  const row3: Array<MathKeyProp> = ['\\frac{#?}{#?}', '(', ')'].map((v) => ({
    children: v,
    onclick: () => {
      controller.add(v);
    }
  }));

  row3.push({
    children: '\\leftarrow',
    onclick: () => {
      controller.move("backword");
    }
  })
  row3.push({
    children: '\\rightarrow',
    onclick: () => {
      controller.move("forward");
    }
  })
  return [...row1, ...row2, ...row3];
}

function BasicKeyboard(): MathKeyProp[] {
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

  return [...row1, ...row2, ...row3, ...row4];
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
      style={{ textTransform: 'lowercase', height: kKeyHeight, width: kKeyWidth }}
    >
      {typeof prop.children === 'string' ?
        <MathView
          value={prop.children}
          readOnly={true}
        /> :
        prop.children}
    </Button>
  );
}