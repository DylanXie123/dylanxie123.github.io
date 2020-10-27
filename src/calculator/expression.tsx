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
    try {
      parser.parseLatex(input);
      this.expression = parser.toAlgebra(algebrite);
    } catch (error) {
      this.expression = null;
    }
  }

  // @computed get variables(): number[] {
  //   try {
  //     return [];
  //   } catch (error) {
  //     return [];
  //   }
  // }

  @computed get eval(): string {
    try {
      return algebrite.float(this.expression).d;
    } catch (error) {
      return error;
    }
  }

  @computed get text(): string {
    try {
      return this.expression.toString();
    } catch (error) {
      return error;
    }
  }

  // @computed get solve(): string {
  //   try {
  //     if (this.expression.variables().length === 1) {
  //       return this.expression.solveFor('x').toString();
  //     } else {
  //       return '';
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // @computed get integrate(): string {
  //   try {
  //     return nerdamer.integrate(this.expression.text());
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // @computed get defint(): string {
  //   try {
  //     return nerdamer.defint(this.expression.text(), 0, 1);
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // @computed get diff(): string {
  //   try {
  //     return nerdamer.diff(this.expression.text());
  //   } catch (error) {
  //     return error;
  //   }
  // }

}

export const expStore = new Expression();
export const ExpContext = React.createContext<Expression>(expStore);