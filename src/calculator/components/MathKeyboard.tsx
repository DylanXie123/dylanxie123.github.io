import React, { MouseEventHandler, useContext } from "react";
import { ControllerContext } from "../model/controller";
import deleteIcon from '../assets/icons/delete.svg';
import backIcon from '../assets/icons/backspace.svg';
import '../assets/fonts/font.css';
import { useExpStore } from "../model/expression";
import { css } from "@emotion/css";

export default function MathKeyboard() {

  const keyboardStyle = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    gap: 2px;
    grid-auto-rows: minmax(32px, auto);
    max-width: 350px;
    margin: auto;
    user-select: none;
  `;

  return (
    <div className={keyboardStyle}>
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

  const btnStyle = css`
    text-transform: lowercase;
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding: 2px;
    background: none;
    border: 1px solid;
    border-radius: 5px;
    transition: all 200ms ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover {
      background: lightgrey;
    };
    &:focus {
      transform: scale(0.95);
      border-width: 2px;
      padding: 1px;
    }
  `;

  const spanStyle = css`
    font-family:'KaTeX';
    font-size: 20px;
  `;

  return (
    <button
      onClick={prop.onclick}
      className={btnStyle}
    >
      {typeof prop.children === 'string' ?
        <span className={spanStyle}> {prop.children} </span> :
        prop.children}
    </button>
  );
}