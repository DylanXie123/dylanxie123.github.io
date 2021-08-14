import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import nerdamer from 'nerdamer';
import AlgebraLatex from 'algebra-latex'
require('nerdamer/all');

export enum Mode {
  Eval = 0,
  Var,
  Defint,
  Limit,
  Matrix,
};

export default class Expression {
  @observable
  latex: string = '';

  private parser = new AlgebraLatex();

  constructor() {
    makeObservable(this);
  }

  @action
  update = (rawLatex: string) => {
    this.latex = rawLatex;
  }

  @computed get expression() {
    try {
      return this.parser.parseLatex(this.latex).toNerdamer() as nerdamer.Expression;
    } catch (error) {
      return undefined;
    }
  }

  @computed get eval() {
    try {
      return this.expression!.evaluate().text();
    } catch (error) {
      return undefined;
    }
  }

  @computed get text() {
    try {
      // TODO: Implement only here, find a better way to implement to all method
      let result = this.expression?.toTeX();
      calc2dis.forEach((v, k) => result = result?.replace(k, v));
      return result;
    } catch (error) {
      return undefined;
    }
  }

  @computed get mode(): Mode {
    try {
      if (this.latex.search('int') >= 0) {
        return Mode.Defint;
      } else if (this.latex.search('limit') >= 0) {
        return Mode.Limit;
      } else if (this.latex.search('matrix') >= 0) {
        return Mode.Matrix;
      } else if (this.latex.search('x') >= 0) {
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
      return this.expression!.solveFor('x').toTeX();
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

const calc2dis = new Map<RegExp, string>([
  [RegExp('\\\\cdot', 'g'), '\\times'],
]);

const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);