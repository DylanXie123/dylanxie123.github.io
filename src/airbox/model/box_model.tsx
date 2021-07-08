import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import LC from 'leanengine';
import Box, { BoxWithoutId, BoxType } from "./box";

export default class AirBoxModel {
  @observable
  private models: Array<Box> = [];

  @observable
  private update = false;

  private liveQuery!: LC.LiveQuery<LC.Queriable>;

  constructor() {
    makeObservable(this);
    if (LC.applicationId === undefined || LC.applicationKey === undefined) {
      LC.init({
        appId: process.env.REACT_APP_LEAN_AIRBOX_ID!,
        appKey: process.env.REACT_APP_LEAN_AIRBOX_KEY!,
      });
    }
  }

  subscribe = (init = true) => {
    const query = new LC.Query('AirBox');
    if (init) {
      action(() => this.update = true);
      query.find().then(boxes =>
        this.replace(boxes.map(items => this.db2model(items)))
      );
    }
    query.subscribe().then(liveQuery => {
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
    this.update = false;
  }

  @action
  private insert = (item: Box) => {
    this.models.push(item);
    this.update = false;
  }

  @action
  private remove = (id: string) => {
    const index = this.models.findIndex((model) => model.id === id);
    if (index > -1) {
      this.models.splice(index, 1);
    }
    this.update = false;
  }

  private db2model(record: LC.Queriable): Box {
    return {
      id: record.get('objectId') as string,
      content: record.get('content') as string,
      boxType: BoxType[record.get('content') as keyof typeof BoxType],
    };
  }

  create = (box: BoxWithoutId) => {
    action(() => this.update = true);
    const AirBoxDB = LC.Object.extend('AirBox');
    const airBoxDB = new AirBoxDB();
    airBoxDB.set('content', box.content);
    airBoxDB.set('boxType', BoxType[box.boxType]);
    return airBoxDB.save();
  }

  delete = (id: string) => {
    action(() => this.update = true);
    const airBoxDB = LC.Object.createWithoutData('AirBox', id);
    airBoxDB.destroy();
  }

  @computed get boxes() {
    return this.models;
  }

  @computed get isUpdating() {
    return this.update;
  }

}

const airBoxModel = new AirBoxModel();
export const AirBoxModelContext = React.createContext<AirBoxModel>(airBoxModel);
