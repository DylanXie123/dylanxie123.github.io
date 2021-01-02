import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import { ControllerContext } from '../model/controller';
import MathView from "react-math-view";
import { MathfieldElement } from 'mathlive';

export default function MathBox() {
  const exp = useContext(ExpContext);
  const controller = useContext(ControllerContext);

  return (
    <MathView
      virtualKeyboardMode='off'
      onContentDidChange={(mf) => exp.update(mf.getValue("latex-expanded"))}
      ref={(mfe) => controller.setController(mfe as unknown as MathfieldElement)}
    />
  );
}