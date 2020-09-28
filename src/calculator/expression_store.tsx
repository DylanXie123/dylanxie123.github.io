import { action, computed, observable } from "mobx";
import * as n from './calculation';

export default class ExpStore {
  @observable expression: string = '1+x';
  // history: Array<string> = [];

  @action
  update = (expression: string) => this.expression = expression;

  @computed get result () {
    return n.calc(this.expression);
  }

  // @action
  // addToHistory = () => {
  //   this.history.push(this.current);
  //   this.current = '';
  // }
}