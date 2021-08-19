import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import LC from 'leanengine';
import Box, { BoxWithoutId, BoxType } from "./box";
import CryptoJS from 'crypto-js';

export default class AirBoxModel {
  @observable
  private models: Array<Box> = [];

  @observable
  private loading = true;

  private liveQuery: LC.LiveQuery<LC.Queriable> | undefined;

  constructor() {
    makeObservable(this);
    if (LC.applicationId === undefined || LC.applicationKey === undefined) {
      LC.init({
        appId: this.decrypt(process.env.REACT_APP_LEAN_AIRBOX_ID),
        appKey: this.decrypt(process.env.REACT_APP_LEAN_AIRBOX_KEY),
      });
    }
    this.subscribe();
  }

  private decrypt = (cipher: string | undefined) => {
    const key = localStorage.getItem('private key');
    if (!key || key.length === 0 || !cipher || cipher.length === 0) {
      throw Error(`decrypt ${cipher} failed`);
    } else {
      return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8)
    }
  }

  subscribe = () => {
    const query = new LC.Query('AirBox');
    query.find().then(boxes =>
      this.replace(boxes.map(items => this.db2model(items)))
    );
    query.subscribe().then(liveQuery => {
      this.liveQuery = liveQuery;
      liveQuery.on('create', item => {
        if (item !== undefined) {
          const box = this.db2model(item);
          this.insert(box);
        }
      });
      liveQuery.on('delete', item => {
        if (item !== undefined) {
          this.remove(item.get('objectId') as string);
        }
      });
    });
  }

  unSubscribe = () => {
    this.liveQuery?.unsubscribe();
  }

  @action
  private replace = (items: Array<Box>) => {
    this.models = items;
    this.loading = false;
  }

  @action
  private insert = (item: Box) => {
    this.models.push(item);
    this.loading = false;
  }

  @action
  private remove = (id: string) => {
    const index = this.models.findIndex((model) => model.id === id);
    if (index > -1) {
      this.models.splice(index, 1);
    }
    this.loading = false;
  }

  private db2model(record: LC.Queriable): Box {
    return {
      id: record.get('objectId') as string,
      content: record.get('content') as string,
      boxType: BoxType[record.get('content') as keyof typeof BoxType],
    };
  }

  create = (box: BoxWithoutId) => {
    action(() => this.loading = true);
    const AirBoxDB = LC.Object.extend('AirBox');
    const airBoxDB = new AirBoxDB();
    airBoxDB.set('content', box.content);
    airBoxDB.set('boxType', BoxType[box.boxType]);
    return airBoxDB.save();
  }

  delete = (id: string) => {
    action(() => this.loading = true);
    const airBoxDB = LC.Object.createWithoutData('AirBox', id);
    airBoxDB.destroy();
  }

  @computed get boxes() {
    return this.models;
  }

  @computed get isLoading() {
    return this.loading;
  }

}

const airBoxModel = new AirBoxModel();
export const AirBoxModelContext = React.createContext<AirBoxModel>(airBoxModel);
