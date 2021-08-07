import { Mathfield } from 'mathlive/dist/public/mathfield'
import React from 'react';

export default class Controller {
  private mfController!: Mathfield;

  setController = (mf: Mathfield) => {
    this.mfController = mf;
    this.focus();
  }

  add = (expression: string) => this.mfController.insert(expression, { focus: true, format: "latex" });

  backspace = () => {
    this.mfController.executeCommand("deleteBackward");
    this.focus();
  }

  clear = () => {
    this.mfController.executeCommand("deleteAll");
    this.focus();
  }

  move = (direction: Direction) => {
    if (direction === "forward") {
      this.mfController.executeCommand("moveToNextChar");
    } else {
      this.mfController.executeCommand("moveToPreviousChar");
    }
  }

  private focus = () => {
    if (this.mfController && this.mfController.focus) {
      this.mfController.focus();
    }
  }
}

type Direction = 'forward' | 'backword';

const controller = new Controller();
export const ControllerContext = React.createContext<Controller>(controller);