import { action, computed, observable } from "mobx";
import React from "react";
import nerdamer from 'nerdamer';
const nerdamerAll = require('nerdamer/all');

export default class Expression {

  @observable
  private expression!: nerdamer.Expression;

  @action
  update = (latex: string) => {
    dis2calc.forEach((v, k) => latex = latex.replaceAll(k, v));
    try {
      this.expression = nerdamerAll.convertFromLaTeX(latex) as nerdamer.Expression;
    } catch (error) {
      this.expression = nerdamer('');
    }
  }

  @computed get eval(): string {
    try {
      return this.expression.evaluate().text();
    } catch (error) {
      return 'error';
    }
  }

  @computed get text(): string {
    try {
      // TODO: Implement only here, find a better way to implement to all method
      let result = this.expression.toTeX();
      calc2dis.forEach((v, k) => result = result.replaceAll(k, v));
      return result;
    } catch (error) {
      return 'error';
    }
  }

  @computed get variable(): string[] {
    try {
      return this.expression.variables();
    } catch (error) {
      return ['error'];
    }
  }

  @computed get solve(): string {
    try {
      return this.expression.solveFor('x').toTeX();
    } catch (error) {
      return 'error';
    }
  }

  @computed get integrate(): string {
    try {
      return nerdamer.integrate(this.expression, 'x').toTeX();
    } catch (error) {
      return 'error';
    }
  }

  @computed get diff(): string {
    try {
      return nerdamer.diff(this.expression, 'x').toTeX();
    } catch (error) {
      return 'error';
    }
  }

}

// TODO: Need a better way to handle display and calc conversion
const dis2calc = new Map<string, string>([
  ['\\times', '*'],
]);

const calc2dis = new Map<string, string>([
  ['\\cdot', '\\times'],
]);

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);