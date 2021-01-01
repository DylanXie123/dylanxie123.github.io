import { Mathfield } from 'mathlive/dist/public/mathfield'
import React from 'react';

export default class Controller {
  private mfController!: Mathfield;

  setController = (mf: Mathfield) => this.mfController = mf;

  add = (expresstion: string) => this.mfController.setValue(expresstion);
}

export const controller = new Controller();
export const ControllerContext = React.createContext<Controller>(controller);