import { action, computed, observable } from "mobx";
import React from "react";
import nerdamer from 'nerdamer';
const nerdamerAll = require('nerdamer/all');

export default class Expression {
  private latex: string = '';

  @observable
  private expression!: nerdamer.Expression;

  @action
  update = (input: string) => {
    this.latex = input;
    try {
      this.expression = nerdamerAll.convertFromLaTeX(input) as nerdamer.Expression;
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
      return this.expression.toTeX();
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

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);