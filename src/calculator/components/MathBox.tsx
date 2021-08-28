import React, { useContext } from "react";
import { useExpStore } from "../model/expression";
import { ControllerContext } from '../model/controller';
import MathView from "react-math-view";

export default function MathBox() {
  const exp = useExpStore();
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
        fontSize: 24,
        marginBlock: 5,
        border: '2px dashed black',
        backgroundColor: 'white',
        gridColumn: '1/-1',
      }}
    />
  );
}