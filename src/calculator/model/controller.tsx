import { Mathfield } from 'mathlive/dist/public/mathfield'
import React from 'react';

export default class Controller {
  private mfController!: Mathfield;

  setController = (mf: Mathfield) => this.mfController = mf;

  add = (expression: string) => this.mfController.insert(expression, { focus: true, format: "latex" });

  backspace = () => this.mfController.executeCommand("deletePreviousChar");


  clear = () => this.mfController.executeCommand("deleteAll");
}

export const controller = new Controller();
export const ControllerContext = React.createContext<Controller>(controller);