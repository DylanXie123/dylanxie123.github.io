import { action, computed, observable } from "mobx";
import React from "react";
const nerdamer = require('nerdamer/all');

export default class Expression {
  @observable latex: string = '';

  @observable expression = nerdamer('');

  @action
  update = (latex: string) => {
    // Mathquill library's some latex output can't be recognized by nerdamer
    this.latex = latex.replaceAll('\\cdot', '*');
    this.latex = this.latex.replaceAll('\\times', '*');
    this.latex = this.latex.replaceAll('\\sqrt[]', '\\sqrt');
    this.latex = this.latex.replaceAll('\\ln', '\\log');
    this.latex = this.latex.replaceAll('\\lg', '\\log10');
    this.latex = this.latex.replaceAll('\\degree', '*pi/180');
    this.latex = this.latex.replaceAll('\\arcsin', '\\asin');
    this.latex = this.latex.replaceAll('\\arccos', '\\acos');
    this.latex = this.latex.replaceAll('\\arctan', '\\atan');
    // nerdamer.convertFromLaTeX cause error when input string is empty
    if (latex.length < 1) {
      this.expression = nerdamer('');
      return;
    }
    try {
      this.expression = nerdamer.convertFromLaTeX(this.latex);
    } catch (error) { }
  }

  @computed get variables(): number[] {
    try {
      return this.expression.variables();
    } catch (error) {
      return [];
    }
  }

  @computed get eval(): string {
    try {
      return this.expression.evaluate().text();
    } catch (error) {
      return error;
    }
  }

  @computed get text(): string {
    try {
      return nerdamer(this.expression.toString()).toTeX();
    } catch (error) {
      return error;
    }
  }

  @computed get solve(): string {
    try {
      if (this.expression.variables().length === 1) {
        return this.expression.solveFor('x').toString();
      } else {
        return '';
      }
    } catch (error) {
      return error;
    }
  }

  @computed get integrate(): string {
    try {
      return nerdamer.integrate(this.expression.text());
    } catch (error) {
      return error;
    }
  }

  @computed get defint(): string {
    try {
      return nerdamer.defint(this.expression.text(), 0, 1);
    } catch (error) {
      return error;
    }
  }

  @computed get diff(): string {
    try {
      return nerdamer.diff(this.expression.text());
    } catch (error) {
      return error;
    }
  }

}

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);