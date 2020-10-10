import { action, computed, observable } from "mobx";
import React from "react";
const nerdamer = require('nerdamer/all');

export default class Expression {
  @observable latex: string = '';

  private expression = nerdamer('');

  @action
  update = (input: string) => {
    // nerdamer.convertFromLaTeX cause error when input string is empty
    if (input.length < 1) {
      this.expression = nerdamer('');
      return;
    }
    // Mathquill library's some latex output can't be recognized by nerdamer
    this.latex = input.replace(new RegExp('\\cdot', 'g'), '*');
    this.latex = this.latex.replace(new RegExp('\\times', 'g'), '*');
    this.latex = this.latex.replace(new RegExp('\\sqrt[]', 'g'), '\\sqrt');
    this.latex = this.latex.replace(new RegExp('\\ln', 'g'), '\\log');
    this.latex = this.latex.replace(new RegExp('\\lg', 'g'), '\\log10');
    this.latex = this.latex.replace(new RegExp('\\degree', 'g'), '*pi/180');
    this.latex = this.latex.replace(new RegExp('\\arcsin', 'g'), '\\asin');
    this.latex = this.latex.replace(new RegExp('\\arccos', 'g'), '\\acos');
    this.latex = this.latex.replace(new RegExp('\\arctan', 'g'), '\\atan');
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