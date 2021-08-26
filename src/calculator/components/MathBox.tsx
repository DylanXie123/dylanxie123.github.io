import React, { useContext } from "react";
import { ExpContext } from "../model/expression";
import { ControllerContext } from '../model/controller';
import MathView from "react-math-view";

export default function MathBox() {
  const exp = useContext(ExpContext);
  const controller = useContext(ControllerContext);

  return (
    <MathView
      virtualKeyboardMode='off'
      fontsDirectory={'../assets/fonts'}
      onContentDidChange={
        mf => exp.update(mf.getValue("latex-expanded"))
      }
      ref={(mfe) => {
        if (mfe) {
          controller.setController(mfe);
        }
      }}
      style={{
        outline: '5px solid white',
        fontSize: 24,
        margin: 5,
        padding: 5,
        border: '2px dashed black',
        backgroundColor: 'white'
      }}
    />
  );
}