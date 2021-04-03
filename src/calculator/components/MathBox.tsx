import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import { ControllerContext } from '../model/controller';
import MathView from "react-math-view";

export default function MathBox() {
  const exp = useContext(ExpContext);
  const controller = useContext(ControllerContext);

  return (
    <MathView
      virtualKeyboardMode='onfocus'
      onContentDidChange={(mf) => exp.update(mf.getValue("latex-expanded"))}
      style={{ outline: 0, fontSize: 24, margin: 5, padding: 5, border: '2px dashed black' }}
      
      ref={(mfe) => {
        if (mfe) {
          controller.setController(mfe!);
        }
      }}
    />
  );
}