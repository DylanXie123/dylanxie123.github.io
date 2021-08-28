import React, { MouseEventHandler, useContext } from "react";
import { ControllerContext } from "../model/controller";
import deleteIcon from '../assets/icons/delete.svg';
import backIcon from '../assets/icons/backspace.svg';
import '../assets/fonts/font.css';
import { useExpStore } from "../model/expression";

const kKeyWidth = 64;
const kKeyHeight = 36;

export default function MathKeyboard() {

  return (
    <div style={{ width: "100%", maxWidth: 400, margin: 'auto'}}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(5, 1fr)`, justifyContent: 'center', gap: 2 }}>
        {ExtraKeyboard().map(
          (key, index) => (
            <div key={'extra' + index}>
              <MathKey
                children={key.children}
                onclick={key.onclick}
                key={index}
              />
            </div>
          )
        )}
        {BasicKeyboard().map(
          (key, index) => (
            <div key={'basic' + index} >
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

  const row1: Array<MathKeyProp> = ['sin', 'cos', 'tan', 'log'].map((v) => ({
    children: v,
    onclick: () => {
      controller.add(`\\${v}({#?})`);
    }
  }));

  row1.push({
    children: 'sqrt',
    onclick: () => {
      controller.add("\\sqrt");
    }
  })

  const row2Trig: Array<Record<"children" | "command", string>> = [
    {
      children: 'asin',
      command: '\\arcsin({#?})'
    },
    {
      children: 'cos',
      command: '\\arccos({#?})'
    },
    {
      children: 'tan',
      command: '\\arctan({#?})'
    },
    {
      children: 'e^',
      command: 'e^{#?}'
    },
    {
      children: '^2',
      command: '{#?}^2'
    },
  ];

  const row2: Array<MathKeyProp> = row2Trig.map((v) => ({
    children: v.children,
    onclick: () => controller.add(v.command)
  }));

  const row3: Array<MathKeyProp> = [{
    children: 'frac',
    onclick: () => controller.add('\\frac'),
  }];

  ['(', ')'].map((v) => (
    row3.push({
      children: v,
      onclick: () => {
        controller.add(v);
      }
    })
  ));

  row3.push({
    children: '←',
    onclick: () => {
      controller.move("backword");
    }
  })

  row3.push({
    children: '→',
    onclick: () => {
      controller.move("forward");
    }
  })
  return [...row1, ...row2, ...row3];
}

function BasicKeyboard(): MathKeyProp[] {
  const controller = useContext(ControllerContext);
  const expStore = useExpStore();

  const row1: Array<MathKeyProp> = ['7', '8', '9'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row1.push({
    children: <img src={deleteIcon} alt="del" style={{ width: 20 }} />,
    onclick: () => controller.clear()
  })

  row1.push({
    children: <img src={backIcon} alt="backspace" style={{ width: 20 }} />,
    onclick: () => controller.backspace()
  })

  const row2: Array<MathKeyProp> = ['4', '5', '6', '+', '-'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  const row3: Array<MathKeyProp> = ['1', '2', '3', '*', '/'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  const row4: Array<MathKeyProp> = ['0', '.', 'e'].map((v) => ({
    children: v,
    onclick: () => controller.add(v)
  }));

  row4.push({
    children: 'pi',
    onclick: () => controller.add('\\pi')
  })

  row4.push({
    children: '=',
    onclick: () => expStore.save()
  })

  return [...row1, ...row2, ...row3, ...row4];
}

interface MathKeyProp {
  onclick: MouseEventHandler
  children?: string | JSX.Element
}

function MathKey(prop: MathKeyProp) {
  return (
    <button
      onClick={prop.onclick}
      style={{
        textTransform: 'lowercase',
        height: "100%",
        width: "100%",
        background: 'none',
      }}
    >
      {typeof prop.children === 'string' ?
        <span style={{ fontFamily: "KaTeX", fontSize: 20 }}> {prop.children} </span> :
        prop.children
      }
    </button>
  );
}