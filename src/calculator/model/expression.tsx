import { action, computed, observable } from "mobx";
import React from "react";
const algebraLatex = require('algebra-latex');
const algebrite = require('algebrite');

const parser = new algebraLatex();

export default class Expression {
  @observable latex: string = '';

  @observable private expression: any;

  @action
  update = (input: string) => {
    this.latex = input;
    try {
      parser.parseLatex(input);
      this.expression = parser.toAlgebra(algebrite);
    } catch (error) {
      this.expression = null;
    }
  }

  @computed get eval(): string {
    try {
      return algebrite.float(this.expression).d;
    } catch (error) {
      return error;
    }
  }

  @computed get text(): string {
    try {
      return algebrite.run("printlatex(" + this.expression.toString() + ")");
    } catch (error) {
      return error;
    }
  }

  @computed get solve(): string {
    try {
      return algebrite.run("printlatex(" + algebrite.roots(this.expression) + ")");
    } catch (error) {
      return error;
    }
  }

  @computed get integrate(): string {
    try {
      return algebrite.run("printlatex(" + algebrite.integral(this.expression) + ")");
    } catch (error) {
      return error;
    }
  }

  @computed get diff(): string {
    try {
      return algebrite.run("printlatex(" + algebrite.derivative(this.expression) + ")");
    } catch (error) {
      return error;
    }
  }

}

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);