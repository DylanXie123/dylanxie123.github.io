import { action, computed, makeObservable, observable } from "mobx";
import React, { useContext } from "react";
import nerdamer from 'nerdamer';
import AlgebraLatex from 'algebra-latex';
import { openDB, DBSchema, IDBPDatabase } from 'idb';
require('nerdamer/all');

export enum Mode {
  Eval,
  Var,
  Defint,
  Limit,
  Matrix,
};

export interface ExprHistory {
  expStr: string,
  date: number,
}

interface ExprDB extends DBSchema {
  expressions: {
    value: ExprHistory;
    key: number;
  };
}

export default class Expression {
  @observable latex: string = '';

  @observable private history: ExprHistory[] = [];

  private db: IDBPDatabase<ExprDB> | undefined;

  private parser = new AlgebraLatex();

  constructor() {
    makeObservable(this);
  }

  @action
  initHistory = async () => {
    const db = await openDB<ExprDB>('expr-db', 1, {
      upgrade(db) {
        db.createObjectStore('expressions', { keyPath: 'date' });
      },
    });
    this.db = db;
    this.history = await db.getAll("expressions");
    console.log(this.history)
  }

  @action
  update = (rawLatex: string) => {
    this.latex = rawLatex;
  }

  @action
  save = () => {
    if (this.db && this.latex.length > 0) {
      const item = { expStr: this.latex, date: Date.now() };
      this.db.put('expressions', item);
      this.history.push(item);
    } else {
      console.log('Invalid save')
    }
  }

  @action
  delete = () => { }

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

  @computed get getHistory() {
    return this.history
  }

}

const calc2dis = new Map<RegExp, string>([
  [RegExp('\\\\cdot', 'g'), '\\times'],
]);

export const ExpContext = React.createContext<Expression>(new Expression());

export const useExpStore = () => {
  const store = useContext(ExpContext);
  return store;
}