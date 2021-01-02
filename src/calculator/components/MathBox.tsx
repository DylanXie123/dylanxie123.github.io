import React ,{ useContext } from "react";
import { MathfieldComponent } from "react-mathlive";
import { combineConfig } from "react-mathlive/dist/MathfieldComponent";
import { ExpContext } from "../model/expression";
import { ControllerContext, controller } from '../model/controller';

export default function MathBox() {
  const exp = useContext(ExpContext);
  const controller = useContext(ControllerContext);

  const config = combineConfig(
    { initialLatex: '' }
  );
  config.virtualKeyboardMode = 'off';
  config.onContentDidChange = (mf) => exp.update(mf.getValue("latex-expanded"));
  
  return (
    <MathfieldComponent
      latex={''}
      mathfieldConfig={config}
      mathfieldRef={(mf) => { controller.setController(mf); }}
    />
  );
}