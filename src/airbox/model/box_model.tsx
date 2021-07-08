import { action, computed, makeObservable, observable } from "mobx";
import React from "react";
import LC from 'leanengine';
import Box from "./box";

export default class AirBoxModel {
  @observable
  private models: Array<Box> = [];

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

  subscribe = (init = true)  => {
    const query = new LC.Query('AirBox');
    if (init) {
      query.find().then(boxes => {
        this.models = boxes.map(items => this.db2model(items))
      });
    }
    query.subscribe().then((liveQuery) => {
       liveQuery.on('create', (newItem) => {
         if (newItem !== undefined) {
           const box = this.db2model(newItem);
           this.models.push(box);
         }
       });
     });
  }

  unSubscribe = () => {
    this.liveQuery?.unsubscribe();
  }

  private db2model(record: LC.Queriable): Box {
    return new Box({
      id: record.get('objectId') as string,
      content: record.get('content') as string,
    });
  }

  @action
  create = async (content: string) => {
    const AirBoxDB = LC.Object.extend('AirBox');
    const airBoxDB = new AirBoxDB();
    airBoxDB.set('content', content);
    return airBoxDB.save();
  }

  @action
  delete = (id: string) => {
    const airBoxDB = LC.Object.createWithoutData('AirBox', id);
    airBoxDB.destroy();
  }

  @computed get boxes() {
    return this.models;
  }

}

const airBoxModel = new AirBoxModel();
export const AirBoxModelContext = React.createContext<AirBoxModel>(airBoxModel);
