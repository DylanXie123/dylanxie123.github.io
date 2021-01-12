import { action, computed, observable } from "mobx";
import React from "react";
import nerdamer from 'nerdamer';
const nerdamerAll = require('nerdamer/all');

export enum Mode {
  Eval = 0,
  Var,
  Defint,
  Limit,
  Matrix,
};

export default class Expression {
  private latex: string = '';

  @observable
  private expression: nerdamer.Expression | undefined = undefined;

  @action
  update = (latex: string) => {
    this.latex = latex;
    dis2calc.forEach((v, k) => latex = latex.replace(new RegExp(k, 'g'), v));
    try {
      this.expression = nerdamerAll.convertFromLaTeX(latex) as nerdamer.Expression;
    } catch (error) {
      this.expression = undefined;
    }
  }

  @computed get eval() {
    try {
      return this.expression?.evaluate().text();
    } catch (error) {
      return undefined;
    }
  }

  @computed get text() {
    try {
      // TODO: Implement only here, find a better way to implement to all method
      let result = this.expression?.toTeX();
      calc2dis.forEach((v, k) => result = result?.replace(new RegExp(k, 'g'), v));
      return result;
    } catch (error) {
      return undefined;
    }
  }

  @computed get mode(): Mode {
    try {
      if (this.latex.search('int') > 0) {
        return Mode.Defint;
      } else if (this.latex.search('limit') > 0) {
        return Mode.Limit;
      } else if (this.latex.search('matrix') > 0) {
        return Mode.Matrix;
      } else if (this.expression && this.expression?.variables().length !== 0) {
        return Mode.Var;
      } else {
        return Mode.Eval;
      }
    } catch (error) {
      return Mode.Eval;
    }
  }

  @computed get solve() {
    try {
      return this.expression?.solveFor('x').toTeX();
    } catch (error) {
      return undefined;
    }
  }

  @computed get integrate() {
    try {
      return nerdamer.integrate(this.expression!, 'x').toTeX();
    } catch (error) {
      return undefined;
    }
  }

  @computed get diff() {
    try {
      return nerdamer.diff(this.expression!, 'x').toTeX();
    } catch (error) {
      return undefined;
    }
  }

}

// TODO: Need a better way to handle display and calc conversion
// use regexp now
const dis2calc = new Map<string, string>([
  ['\\\\times', '*'],
  ['\\\\div', '/'],
  ['\\\\arcsin', '\\asin'],
]);

const calc2dis = new Map<string, string>([
  ['\\\\cdot', '\\times'],
]);

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);